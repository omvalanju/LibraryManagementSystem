package com.library.LMS.repository;

import com.library.LMS.entity.People;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PeopleRepository {

    private final JdbcClient jdbcClient;

    public PeopleRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<People> findAll() {
        return jdbcClient.sql("SELECT * FROM people")
                .query(BeanPropertyRowMapper.newInstance(People.class))
                .list();
    }
    public People findByEmail(String email) {
        String query = "SELECT * FROM people WHERE email = ?";
        return jdbcClient.sql(query)
                .param(email)
                .query(BeanPropertyRowMapper.newInstance(People.class))
                .optional()
                .orElse(null);
    }

    public People findById(Integer id) {
        String query = "SELECT * FROM people WHERE people_id = ?";
        return jdbcClient.sql(query)
                .param(id)
                .query(BeanPropertyRowMapper.newInstance(People.class))
                .optional()
                .orElse(null); // Return null if no record is found
    }

    public void save(People person) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(person.getHash());
        person.setHash(hashedPassword);

        jdbcClient.sql("INSERT INTO people (first_name, last_name, email, phone_number, hash, type, address, join_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
                .param(person.getFirstName())
                .param(person.getLastName())
                .param(person.getEmail())
                .param(person.getPhoneNumber())
                .param(person.getHash())
                .param(person.getType().name())
                .param(person.getAddress())
                .param(person.getJoinDate())
                .update();
    }
    public boolean validatePassword(String email, String rawPassword) {
        People person = findByEmail(email);
        if (person != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            return encoder.matches(rawPassword, person.getHash());
        }
        return false;
    }
}

