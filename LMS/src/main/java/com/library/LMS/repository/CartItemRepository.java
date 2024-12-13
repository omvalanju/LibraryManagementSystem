package com.library.LMS.repository;

import com.library.LMS.entity.CartItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByCart_CartId(Integer cartId);
    @Modifying
    @Query("UPDATE CartItem ci SET ci.quantity = ci.quantity - 1 " +
            "WHERE ci.book.bookId = :bookId AND ci.quantity > 1 AND ci.cart.people.peopleId = :peopleId")
    int decrementQuantity(@Param("bookId") Integer bookId, @Param("peopleId") Integer peopleId);

    @Modifying
    @Query("DELETE FROM CartItem ci " +
            "WHERE ci.book.bookId = :bookId AND ci.quantity = 1 AND ci.cart.people.peopleId = :peopleId")
    int removeCartItem(@Param("bookId") Integer bookId, @Param("peopleId") Integer peopleId);

}