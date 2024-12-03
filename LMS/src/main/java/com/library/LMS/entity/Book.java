package com.library.LMS.entity;

public record Book(
    Integer Book_ID,
    String Title,
    String Author,
    String Publisher,
    String ISBN,
    Integer Published_Year,
    Integer Copies_Available
) {}
