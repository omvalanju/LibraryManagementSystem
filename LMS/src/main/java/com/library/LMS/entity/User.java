package com.library.LMS.entity;

public class User {
    //----------------------------------------- Filed
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private String hash;
    private String type;
    private  String address;
    //----------------------------------------- Ctor
    public User(String firstName, String lastName, String email,String phoneNumber, String hash, String type, String address) {
        this.first_name = firstName;
        this.last_name = lastName;
        this.email = email;
        this.phone_number = phoneNumber;
        this.hash = hash;
        this.type = type;
        this.address = address;
    }
    //----------------------------------------- Properties
    public String getFirst_name() {
        return first_name;
    }
    public void setFirst_name(String firstName) {
        this.first_name = firstName;
    }
    public String getLast_name() {
        return last_name;
    }
    public void setLast_name(String lastName) {
        this.last_name = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone_number() {
        return phone_number;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getAddress() {
        return address;
    }
    public void setPhone_number(String phoneNumber) {
        this.phone_number = phoneNumber;
    }
    public String getHash() {
        return hash;
    }
    public void setHash(String hash) {
        this.hash = hash;
    }
    public String getRole() {
        return type;
    }
    public void setRole(String role) {
        this.type = role;
    }
}
