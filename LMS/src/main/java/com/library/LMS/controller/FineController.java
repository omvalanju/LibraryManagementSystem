package com.library.LMS.controller;

import com.library.LMS.service.FineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fines")
public class FineController {

    @Autowired
    private FineService fineService;

    @PostMapping("/calculate")
    public ResponseEntity<Void> calculateFines() {
        fineService.calculateFine();
        return ResponseEntity.ok().build();
    }
}
