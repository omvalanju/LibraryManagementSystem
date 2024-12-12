package com.library.LMS.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BorrowRecordRepository {

    private final JdbcTemplate jdbcTemplate;

    public BorrowRecordRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
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
}
