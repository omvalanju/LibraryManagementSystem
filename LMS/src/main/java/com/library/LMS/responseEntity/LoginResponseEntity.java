package com.library.LMS.responseEntity;

public class LoginResponseEntity {
    private String token;
    private String role;
    private String email;
    // Constructor
    public LoginResponseEntity(String token, String role,String email) {
        this.token = token;
        this.role = role;
        this.email = email;
    }
    public String getEmail() {
            return email;
    }
    public void setEmail(String email) {
            this.email = email;
    }
    // Getters and Setters
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
