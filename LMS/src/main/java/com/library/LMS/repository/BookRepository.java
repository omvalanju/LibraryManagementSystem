package com.library.LMS.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;
import com.library.LMS.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BookRepository {

    private final JdbcClient jdbcClient;

    private List<Book> books = new ArrayList<>();

    public BookRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Book> findAll() {
        return jdbcClient.sql("select * from books")
                .query(Book.class)
                .list();
    }

    public void create(Book book) {
        jdbcClient.sql("INSERT INTO books(Book_ID, Title, Author, Publisher, ISBN, Published_Year, Copies_Available) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?)")
                .params(List.of(
                        book.Book_ID(),
                        book.Title(),
                        book.Author(),
                        book.Publisher(),
                        book.ISBN(),
                        book.Published_Year(),
                        book.Copies_Available()
                ))
                .update();
    }

}

