package com.library.LMS.repository;

import com.library.LMS.entity.Cart;
import com.library.LMS.responseEntity.CartItemResponseEntity;
import com.library.LMS.responseEntity.CartResponseEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByPeople_PeopleId(Integer peopleId);

    @Query("SELECT c.cartId, c.people.peopleId, c.people.firstName, c.people.lastName, ci.cartItemId, " +
            "b.bookId, b.bookTitle, b.authorName, p.publisherName, b.ISBN, ci.quantity " +
            "FROM Cart c " +
            "JOIN c.cartItems ci " +
            "JOIN ci.book b " +
            "JOIN b.publisher p " +
            "WHERE c.status = 'active' " +
            "AND c.people.peopleId = :peopleId")
    List<Object[]> findCartItemsByPeopleId(@Param("peopleId") Integer peopleId);


    @Query("SELECT " +
            "new com.library.LMS.responseEntity.CartResponseEntity(" +
            "c.cartId, " +
            "c.people.peopleId, " +
            "c.people.firstName, " +
            "(SELECT new com.library.LMS.responseEntity.CartItemResponseEntity(" +
            "ci.cartItemId, " +
            "b.bookId, " +
            "b.bookTitle, " +
            "b.authorName, " +
            "p.publisherName, " +
            "b.ISBN, " +
            "ci.quantity) " +
            "FROM CartItem ci " +
            "JOIN ci.book b " +
            "JOIN b.publisher p " +
            "WHERE ci.cart.cartId = c.cartId) " +
            ") " +
            "FROM Cart c " +
            "WHERE c.status = 'active'")
    List<CartResponseEntity> findAllActiveCartsWithItems();

    @Query("SELECT c FROM Cart c WHERE c.status = 'active'")
    List<Cart> findAllActiveCarts();

    @Modifying
    @Transactional
    @Query("UPDATE Cart c SET c.status = 'inactive' WHERE c.people.peopleId = :peopleId AND c.status = 'active'")
    void deactivateActiveCartByPeopleId(@Param("peopleId") Integer peopleId);


}