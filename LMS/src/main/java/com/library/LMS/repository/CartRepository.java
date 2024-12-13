package com.library.LMS.repository;

import com.library.LMS.entity.Book;
import com.library.LMS.entity.Cart;
import com.library.LMS.responseEntity.CartItemResponseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByPeople_PeopleId(Integer peopleId);
    @Query(value = "SELECT " +
            "new com.library.LMS.responseEntity.CartItemResponseEntity(" +
            "b.bookId, " +
            "b.bookTitle, " +
            "b.authorName, " +
            "p.publisherName, " +
            "b.ISBN, " +
            "ci.quantity) " +
            "FROM CartItem ci " +
            "JOIN ci.book b " +
            "JOIN b.publisher p " +
            "JOIN ci.cart c " +
            "WHERE c.status = 'active' " +
            "AND c.people.peopleId = :peopleId")
    List<CartItemResponseEntity> findCartItemsByPeopleId(@Param("peopleId") Integer peopleId);





}