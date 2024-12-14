package com.library.LMS.repository;

import com.library.LMS.entity.Book;
import com.library.LMS.entity.Publisher;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Repository
public class BookRepository {

    private final JdbcClient jdbcClient;

    Logger logger = LoggerFactory.getLogger(BookRepository.class);

    public BookRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    // Retrieve all books
    public List<Book> findAll() {
        String sql = """
        SELECT 
            b.book_id, 
            b.book_title, 
            b.author_name, 
            b.ISBN, 
            b.copies_available,
            p.publisher_id,
            p.publisher_name
        FROM 
            books b
        JOIN 
            publisher p ON b.publisher_id = p.publisher_id
    """;

        return jdbcClient.sql(sql)
                .query((rs, rowNum) -> {
                    Book book = new Book();
                    book.setBookId(rs.getInt("book_id"));
                    book.setBookTitle(rs.getString("book_title"));
                    book.setAuthorName(rs.getString("author_name"));
                    book.setISBN(rs.getString("ISBN"));
                    book.setCopiesAvailable(rs.getInt("copies_available"));

                    Publisher publisher = new Publisher();
                    publisher.setPublisherId(rs.getInt("publisher_id"));
                    publisher.setPublisherName(rs.getString("publisher_name"));
                    book.setPublisher(publisher);

                    return book;
                })
                .list();
    }


    // Create a new book
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

    // Retrieve a book by ID
    public Optional<Book> findById(int bookId) {
        return jdbcClient.sql("SELECT * FROM books WHERE book_id = ?")
                .params(bookId)
                .query(BeanPropertyRowMapper.newInstance(Book.class))
                .optional();
    }

    // Delete a Book by ID
    public boolean deleteById(int bookId) {
        int rowsAffected = jdbcClient.sql("DELETE FROM books WHERE book_id = ?")
                .params(bookId)
                .update();

        return rowsAffected > 0;
    }

    // Update a book by ID
    public boolean update(int bookId, Book updatedBook) {
        int rowsAffected = jdbcClient.sql("UPDATE books SET book_title = ?, author_name = ?, publisher_id = ?, ISBN = ?, copies_available = ? " +
                        "WHERE book_id = ?")
                .params(
                        updatedBook.getBookTitle(),
                        updatedBook.getAuthorName(),
                        updatedBook.getPublisher().getPublisherId(),
                        updatedBook.getISBN(),
                        updatedBook.getCopiesAvailable(),
                        bookId
                )
                .update();
        return rowsAffected > 0;
    }

    // Search books by keyword
    public List<Map<String, Object>> searchBooks(String keyword) {
        List<Map<String, Object>> results = jdbcClient.sql(
                        "SELECT b.book_id, b.book_title, b.author_name, b.copies_available, b.ISBN, " +
                                "p.publisher_name FROM books b " +
                                "JOIN publisher p ON b.publisher_id = p.publisher_id " +
                                "WHERE b.book_title LIKE ? OR b.author_name LIKE ? OR b.ISBN LIKE ? OR p.publisher_name LIKE ?"
                )
                .params("%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%")
                .query()
                .listOfRows();

        List<Map<String, Object>> books = results.stream().map(row -> Map.of(
                "bookId", row.get("book_id"),
                "bookTitle", row.get("book_title"),
                "authorName", row.get("author_name"),
                "publisher", row.get("publisher_name"),
                "copiesAvailable", row.get("copies_available"),
                "isbn", row.get("ISBN")
        )).collect(Collectors.toList());

        logger.info("Search results for keyword '{}': {}", keyword, books);
        return books;
    }
}
