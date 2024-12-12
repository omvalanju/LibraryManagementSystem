package com.library.LMS.controller;

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

    public BorrowRecordController(BorrowRecordRepository borrowRecordRepository) {
        this.borrowRecordRepository = borrowRecordRepository;
    }

    @GetMapping("/user-books/{userId}")
    public ResponseEntity<?> getUserBorrowedBooks(@PathVariable int userId) {
        List<Map<String, Object>> borrowRecords = borrowRecordRepository.findBorrowRecordsByUserId(userId);

        if (borrowRecords.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No borrow records found for user ID: " + userId);
        }

        return ResponseEntity.ok(borrowRecords);
    }
}
