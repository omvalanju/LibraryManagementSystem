package com.library.LMS.repository;

import com.library.LMS.entity.Book;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepository {

    private final JdbcClient jdbcClient;

    public BookRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Book> findAll() {
        return jdbcClient.sql("SELECT * FROM books")
                .query(BeanPropertyRowMapper.newInstance(Book.class))
                .list();
    }

    public void create(Book book) {
        jdbcClient.sql("INSERT INTO books (book_title, author_name, publisher_id, ISBN, copies_available) " +
                        "VALUES (?, ?, ?, ?, ?)")
                .params(
                        book.getBookTitle(),
                        book.getAuthorName(),
                        book.getPublisher().getPublisherId(),
                        book.getISBN(),
                        book.getCopiesAvailable()
                )
                .update();
    }

    public List<Book> searchBooks(String keyword) {
        return jdbcClient.sql(
                        "SELECT b.* FROM books b " +
                                "JOIN publisher p ON b.publisher_id = p.publisher_id " +
                                "WHERE b.book_title LIKE ? OR b.author_name LIKE ? OR b.ISBN LIKE ? OR p.publisher_name LIKE ?"
                )
                .params("%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%")
                .query(BeanPropertyRowMapper.newInstance(Book.class))
                .list();
    }

}
