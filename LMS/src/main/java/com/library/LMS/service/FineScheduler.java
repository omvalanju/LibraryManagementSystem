package com.library.LMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class FineScheduler {

    @Autowired
    private FineService fineService;

    @Scheduled(cron = "0 0 0 * * ?") // Runs daily at midnight
    public void calculateDailyFines() {
        fineService.calculateFine();
    }
}
