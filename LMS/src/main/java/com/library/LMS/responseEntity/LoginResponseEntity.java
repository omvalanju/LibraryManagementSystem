package com.library.LMS.responseEntity;

import com.library.LMS.entity.People;

public class LoginResponseEntity {
    private String token;
    private String role;
    private final People people;
    // Constructor
    public LoginResponseEntity(String token, String role, People people) {
        this.token = token;
        this.role = role;
        this.people = people;
    }
    public  People getPeople() {
        return people;
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
