package com.library.LMS.responseEntity;

public class VerifyResponseEntity {
    private String email;
    private String role;
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public VerifyResponseEntity(String email,String role) {
        this.email = email;
        this.role = role;
    }
}
