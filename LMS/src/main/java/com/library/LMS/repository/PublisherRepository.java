package com.library.LMS.repository;

import com.library.LMS.entity.Publisher;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PublisherRepository {

    private final JdbcClient jdbcClient;

    public PublisherRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    // Retrieve all publishers
    public List<Publisher> findAll() {
        return jdbcClient.sql("SELECT * FROM publisher")
                .query(BeanPropertyRowMapper.newInstance(Publisher.class))
                .list();
    }

    // Create a new publisher
    public void create(Publisher publisher) {
        jdbcClient.sql("INSERT INTO publisher (publisher_name, phone_number, address, email)" +
                        "VALUES (?, ?, ?, ?)")
                .params(
                        publisher.getPublisherName(),
                        publisher.getPhoneNumber(),
                        publisher.getAddress(),
                        publisher.getEmail()
                )
                .update();
    }

    // Retrieve a publisher by ID
    public Optional<Publisher> findById(Integer id) {
        return jdbcClient.sql("SELECT * FROM publisher WHERE publisher_id = ?")
                .params(id)
                .query(BeanPropertyRowMapper.newInstance(Publisher.class))
                .optional();
    }

    // Update a publisher by ID
    public boolean update(Publisher publisher) {
        int rowsAffected = jdbcClient.sql("UPDATE publisher SET publisher_name = ?, phone_number = ?, address = ?, email = ?" +
                        "WHERE publisher_id = ?")
                .params(
                        publisher.getPublisherName(),
                        publisher.getPhoneNumber(),
                        publisher.getAddress(),
                        publisher.getEmail(),
                        publisher.getPublisherId()
                )
                .update();
        return rowsAffected > 0;
    }

    // Delete a publisher by ID
    public boolean deleteById(Integer id) {
        int rowsAffected = jdbcClient.sql("DELETE FROM publisher WHERE publisher_id = ?")
                .params(id)
                .update();
        return rowsAffected > 0;
    }

    // Search publishers by keyword
    public List<Publisher> searchPublisher(String keyword) {
        return jdbcClient.sql("SELECT * FROM publisher WHERE publisher_name LIKE ? OR email LIKE ? OR address LIKE ?")
                .params("%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%")
                .query(BeanPropertyRowMapper.newInstance(Publisher.class))
                .list();
    }
}
