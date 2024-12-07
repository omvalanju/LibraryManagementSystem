package com.library.LMS.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Integer bookId;

    @Column(name = "book_title", nullable = false)
    private String bookTitle;

    @Column(name = "author_name", nullable = false)
    private String authorName;

    @ManyToOne
    @JoinColumn(name = "publisher_id", nullable = false)
    private Publisher publisher;

    @Column(name = "ISBN", nullable = false)
    private String ISBN;

    @Column(name = "copies_available", nullable = false)
    private Integer copiesAvailable;

    public Book() {
    }

    public Book(String bookTitle, String authorName, Publisher publisher, String ISBN, Integer copiesAvailable) {
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.publisher = publisher;
        this.ISBN = ISBN;
        this.copiesAvailable = copiesAvailable;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public Integer getCopiesAvailable() {
        return copiesAvailable;
    }

    public void setCopiesAvailable(Integer copiesAvailable) {
        this.copiesAvailable = copiesAvailable;
    }
}
