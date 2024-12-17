package com.library.LMS.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.sql.Date;
import java.time.LocalDate;


@Repository
public class BorrowRecordRepository {

    private final JdbcTemplate jdbcTemplate;

    public BorrowRecordRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void insertBorrowRecord(int peopleId, int bookId, LocalDate borrowDate, LocalDate dueDate) {
        String insertQuery = """
            INSERT INTO borrow_records (people_id, book_id, borrow_date, due_date)
            VALUES (?, ?, ?, ?)
            """;
        jdbcTemplate.update(insertQuery, peopleId, bookId, borrowDate, dueDate);
    }

    public List<Map<String, Object>> findBorrowRecordsByUserId(int userId) {
        String query = """
                SELECT 
                    p.people_id,
                    CONCAT(p.first_name, ' ', p.last_name) AS full_name,
                    p.email,
                    b.book_id,
                    b.book_title,
                    b.author_name,
                    br.borrow_date,
                    br.due_date,
                    IFNULL(f.fine_amount, 0) AS fine_amount,
                    IFNULL(f.status, 'no fine') AS fine_status
                FROM 
                    lms.borrow_records br
                INNER JOIN 
                    lms.people p ON br.people_id = p.people_id
                INNER JOIN 
                    lms.books b ON br.book_id = b.book_id
                LEFT JOIN 
                    lms.fines f ON br.book_id = f.book_id AND br.people_id = f.people_id
                WHERE 
                    p.people_id = ?
                """;

        return jdbcTemplate.queryForList(query, userId);
        }

    public List<Map<String, Object>> findOverdueBorrowRecordsByRole(String role, LocalDate referenceDate) {
        String query = """
            SELECT 
                br.borrow_id,
                p.people_id,
                CONCAT(p.first_name, ' ', p.last_name) AS full_name,
                b.book_id,
                b.book_title,
                br.due_date
            FROM 
                lms.borrow_records br
            INNER JOIN 
                lms.people p ON br.people_id = p.people_id
            INNER JOIN 
                lms.books b ON br.book_id = b.book_id
            WHERE 
                p.type = ? AND 
                br.due_date < ?
            """;

        return jdbcTemplate.queryForList(query, role, referenceDate);
    }
}
