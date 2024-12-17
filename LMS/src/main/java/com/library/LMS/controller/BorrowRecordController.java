package com.library.LMS.controller;

import com.library.LMS.dto.BorrowRequestDTO;
import com.library.LMS.entity.Cart;
import com.library.LMS.repository.CartRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.library.LMS.repository.BorrowRecordRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/borrow-records")
public class BorrowRecordController {

    private final BorrowRecordRepository borrowRecordRepository;
    private final CartRepository cartRepository;

    public BorrowRecordController(BorrowRecordRepository borrowRecordRepository, CartRepository cartRepository) {
        this.borrowRecordRepository = borrowRecordRepository;
        this.cartRepository = cartRepository;
    }

    @GetMapping("/user-books/{userId}")
    public ResponseEntity<?> getUserBorrowedBooks(@PathVariable int userId) {
        List<Map<String, Object>> borrowRecords = borrowRecordRepository.findBorrowRecordsByUserId(userId);

        if (borrowRecords.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No borrow records found for user ID: " + userId);
        }

        return ResponseEntity.ok(borrowRecords);
    }

    @PostMapping("/borrow")
    public ResponseEntity<?> borrowBooks(@RequestBody BorrowRequestDTO borrowRequest) {
        try {
            int peopleId = borrowRequest.getPeopleId();
            List<BorrowRequestDTO.BookDTO> books = borrowRequest.getBooks();

            // یافتن سبد خرید فعال کاربر
            var activeCart = cartRepository.findByPeople_PeopleId(peopleId)
                    .stream()
                    .filter(cart -> cart.getStatus().equals(Cart.Status.active))
                    .findFirst()
                    .orElse(null);

            if (activeCart == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No active cart found for user ID: " + peopleId);
            }

            // افزودن کتاب‌ها به borrow_records
            for (BorrowRequestDTO.BookDTO book : books) {
                borrowRecordRepository.insertBorrowRecord(peopleId, book.getBookId(), book.getBorrowDate(), book.getDueDate());
            }

            // غیرفعال کردن سبد خرید
            cartRepository.deactivateActiveCartByPeopleId(peopleId);

            return ResponseEntity.ok("Books borrowed successfully and cart deactivated.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred: " + e.getMessage());
        }
    }
}
