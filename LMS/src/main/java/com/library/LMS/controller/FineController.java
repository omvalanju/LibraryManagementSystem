package com.library.LMS.controller;

import com.library.LMS.entity.Fine;
import com.library.LMS.repository.FineRepository;
import com.library.LMS.service.FineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/fines")
public class FineController {

    @Autowired
    private FineService fineService;

    @Autowired
    private FineRepository fineRepository;


    @PostMapping("/calculate")
    public ResponseEntity<Void> calculateFines() {
        fineService.calculateFine();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Integer> getFineByUserId(@PathVariable Long userId) {
        Optional<Fine> fine = fineRepository.findByPeople_PeopleId(userId.intValue());
        if (fine.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(fine.get().getFineAmount());
    }
}
