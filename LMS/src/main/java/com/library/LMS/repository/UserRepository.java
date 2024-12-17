package com.library.LMS.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import com.library.LMS.entity.User;

@Repository
public class UserRepository {

    private final JdbcClient jdbcClient;

    public UserRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    // Find a user with email from the people table
    public User findByEmail(String email) {
        return jdbcClient.sql("SELECT * FROM people WHERE email = ?")
                .params(email)
                .query(User.class)
                .stream()
                .findFirst()
                .orElse(null);

    }

    //Check email and hash is valid or not
    public boolean validateUser(String email, String hashedPassword) {
        User user = findByEmail(email);
        if (user != null && user.getHash().equals(hashedPassword)) {
            return true;
        }
        return false;
    }

    // Get client's role
    public String getUserRole(String email) {
        User user = findByEmail(email);
        return (user != null) ? user.getRole() : null;
    }

}
