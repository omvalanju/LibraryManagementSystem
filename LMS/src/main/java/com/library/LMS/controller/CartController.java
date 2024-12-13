package com.library.LMS.controller;

import com.library.LMS.entity.Book;
import com.library.LMS.entity.Cart;
import com.library.LMS.entity.CartItem;
import com.library.LMS.entity.People;
import com.library.LMS.repository.BookRepository;
import com.library.LMS.repository.CartItemRepository;
import com.library.LMS.repository.CartRepository;
import com.library.LMS.responseEntity.CartItemResponseEntity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/{peopleId}/add")
    public ResponseEntity<?> addBookToCart(
            @PathVariable Integer peopleId,
            @RequestParam Integer bookId,
            @RequestParam(defaultValue = "1") int quantity) {

        // Fetch the list of carts for the given user
        List<Cart> carts = cartRepository.findByPeople_PeopleId(peopleId);
        Cart cart;

        if (carts.isEmpty()) {
            // If no cart exists, create a new one
            cart = new Cart();
            People user = new People(); // Fetch the user from the People repository if needed
            user.setPeopleId(peopleId);
            cart.setPeople(user);
            cart = cartRepository.save(cart); // Save the new cart
        } else {
            // If carts exist, use the first cart
            cart = carts.get(0);
        }

        // Fetch the book details
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (bookOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
        }

        // Add the book to the cart
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setBook(bookOptional.get());
        cartItem.setQuantity(quantity);

        cartItemRepository.save(cartItem);
        return ResponseEntity.ok("Book added to cart");
    }

    @GetMapping("/{peopleId}")
    public ResponseEntity<?> getCartItems(@PathVariable Integer peopleId) {
        List<CartItemResponseEntity> cartItems = cartRepository.findCartItemsByPeopleId(peopleId);
        if (cartItems.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("There are no cart items in the cart");
        }
        return ResponseEntity.ok(cartItems);
    }


    @DeleteMapping("/{userId}/remove/{itemId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long userId, @PathVariable Integer itemId) {
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(itemId);
        if (optionalCartItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item not found");
        }

        cartItemRepository.delete(optionalCartItem.get());
        return ResponseEntity.ok("Item removed from cart");
    }
    @PostMapping("/update/{peopleId}/{bookId}")
    @Transactional
    public ResponseEntity<?> updateCartItem(@PathVariable Integer peopleId, @PathVariable Integer bookId) {
        int updatedRows = cartItemRepository.decrementQuantity(bookId, peopleId);

        if (updatedRows == 0) {
            cartItemRepository.removeCartItem(bookId, peopleId);
        }

        return ResponseEntity.ok("Cart item updated successfully");
    }
}