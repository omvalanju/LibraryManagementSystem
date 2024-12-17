package com.library.LMS.responseEntity;

import java.util.List;

public class CartResponseEntity {

    private Integer cartId;
    private Integer peopleId;
    private String peopleName;
    private List<CartItemResponseEntity> cartItems;

    public CartResponseEntity(Integer cartId, Integer peopleId, String peopleName, List<CartItemResponseEntity> cartItems) {
        this.cartId = cartId;
        this.peopleId = peopleId;
        this.peopleName = peopleName;
        this.cartItems = cartItems;
    }

    // Getters and Setters
    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Integer getPeopleId() {
        return peopleId;
    }

    public void setPeopleId(Integer peopleId) {
        this.peopleId = peopleId;
    }

    public String getPeopleName() {
        return peopleName;
    }

    public void setPeopleName(String peopleName) {
        this.peopleName = peopleName;
    }

    public List<CartItemResponseEntity> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemResponseEntity> cartItems) {
        this.cartItems = cartItems;
    }
}
