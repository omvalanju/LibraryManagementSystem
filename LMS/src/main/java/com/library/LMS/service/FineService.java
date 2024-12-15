package com.library.LMS.service;

import com.library.LMS.entity.Book;
import com.library.LMS.entity.Fine;
import com.library.LMS.entity.People;
import com.library.LMS.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class FineService {

    private static final Logger logger = LoggerFactory.getLogger(FineService.class);

    private final BorrowRecordRepository borrowRecordRepository;
    private final FineRepository fineRepository;
    private final BookRepository bookRepository;
    private final PeopleRepository peopleRepository;

    public FineService(BorrowRecordRepository borrowRecordRepository, FineRepository fineRepository,
                       BookRepository bookRepository, PeopleRepository peopleRepository) {
        this.borrowRecordRepository = borrowRecordRepository;
        this.fineRepository = fineRepository;
        this.bookRepository = bookRepository;
        this.peopleRepository = peopleRepository;
    }

    public void calculateFine() {
        logger.info("Starting fine calculation...");
        processOverdueRecords("student", 1);
        processOverdueRecords("professor", 20);
        logger.info("Fine calculation completed.");
    }

    private void processOverdueRecords(String role, int overdueDays) {
        LocalDate cutoffDate = LocalDate.now().minusDays(overdueDays);
        logger.info("Processing overdue records for role: {} with cutoff date: {}", role, cutoffDate);

        List<Map<String, Object>> overdueRecords = borrowRecordRepository.findOverdueBorrowRecordsByRole(role, cutoffDate);
        logger.info("Found {} overdue records for role: {}", overdueRecords.size(), role);

        for (Map<String, Object> record : overdueRecords) {
            try {
                Integer bookId = (Integer) record.get("book_id");
                Integer peopleId = (Integer) record.get("people_id");
                LocalDate dueDate = ((java.sql.Date) record.get("due_date")).toLocalDate();

                int daysOverdue = Math.max(0, (int) java.time.temporal.ChronoUnit.DAYS.between(dueDate, LocalDate.now()));
                int fineAmount = daysOverdue * 2; // €2 per day overdue

                logger.info("Calculating fine for Book ID: {}, Person ID: {}, Days Overdue: {}, Fine Amount: €{}",
                        bookId, peopleId, daysOverdue, fineAmount);

                Book book = bookRepository.findById(bookId)
                        .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
                People people = peopleRepository.findById(peopleId);
                        //.orElseThrow(() -> new RuntimeException("Person not found with ID: " + peopleId));

                Fine fine = new Fine();
                fine.setBook(book);
                fine.setPeople(people);
                fine.setFineAmount(fineAmount);
                fine.setStatus(Fine.FineStatus.DUE);

                fineRepository.save(fine);
                logger.info("Saved fine for Book ID: {}, Person ID: {}, Fine Amount: €{}", bookId, peopleId, fineAmount);

            } catch (Exception e) {
                logger.error("Error processing overdue record: {}", record, e);
            }
        }
    }
}
