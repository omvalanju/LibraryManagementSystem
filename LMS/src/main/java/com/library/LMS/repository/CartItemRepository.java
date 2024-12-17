package com.library.LMS.repository;

import com.library.LMS.entity.CartItem;
import com.library.LMS.responseEntity.CartItemResponseEntity;
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

    @Query("SELECT new com.library.LMS.responseEntity.CartItemResponseEntity(" +
            "ci.cart.cartId, " +
            "b.bookId, " +
            "b.bookTitle, " +
            "b.authorName, " +
            "p.publisherName, " +
            "b.ISBN, " +
            "ci.quantity) " +
            "FROM CartItem ci " +
            "JOIN ci.book b " +
            "JOIN b.publisher p " +
            "WHERE ci.cart.cartId = :cartId")
    List<CartItemResponseEntity> findItemsByCartId(@Param("cartId") Integer cartId);
}