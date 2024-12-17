package com.library.LMS.dto;

import java.time.LocalDate;
import java.util.List;

public class BorrowRequestDTO {

    private int peopleId;
    private List<BookDTO> books;

    public int getPeopleId() {
        return peopleId;
    }

    public void setPeopleId(int peopleId) {
        this.peopleId = peopleId;
    }

    public List<BookDTO> getBooks() {
        return books;
    }

    public void setBooks(List<BookDTO> books) {
        this.books = books;
    }

    public static class BookDTO {
        private int bookId;
        private LocalDate borrowDate;
        private LocalDate dueDate;

        public int getBookId() {
            return bookId;
        }

        public void setBookId(int bookId) {
            this.bookId = bookId;
        }

        public LocalDate getBorrowDate() {
            return borrowDate;
        }

        public void setBorrowDate(LocalDate borrowDate) {
            this.borrowDate = borrowDate;
        }

        public LocalDate getDueDate() {
            return dueDate;
        }

        public void setDueDate(LocalDate dueDate) {
            this.dueDate = dueDate;
        }
    }
}
