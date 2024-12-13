package com.library.LMS.responseEntity;

public class CartItemResponseEntity {
    private Integer bookId;
    private String bookTitle;
    private String authorName;
    private String publisher;
    private String isbn;
    private Integer quantity;
    public CartItemResponseEntity( Integer bookId, String bookTitle, String authorName, String publisher, String isbn, Integer quantity) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.publisher = publisher;
        this.isbn = isbn;
        this.quantity = quantity;
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
    public String getPublisher() {
        return publisher;
    }
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }
    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
