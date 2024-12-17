package com.library.LMS.controller;

import com.library.LMS.RequestEntity.CartItemRequest;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.library.LMS.responseEntity.CartResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/all")
    public List<CartResponseEntity> getAllActiveCarts() {
        List<Cart> activeCarts = cartRepository.findAllActiveCarts();
        List<CartResponseEntity> result = new ArrayList<>();

        for (Cart cart : activeCarts) {
            // برای هر سبد خرید، اقلام آن را جداگانه بگیرید
            List<CartItemResponseEntity> cartItems = cartItemRepository.findItemsByCartId(cart.getCartId());
            result.add(new CartResponseEntity(
                    cart.getCartId(),
                    cart.getPeople().getPeopleId(),
                    cart.getPeople().getFirstName() + " " + cart.getPeople().getLastName(),
                    cartItems
            ));
        }

        return result;
    }



    @PostMapping("/{peopleId}/addMultiple")
    public ResponseEntity<?> addMultipleBooksToCart(
            @PathVariable Integer peopleId,
            @RequestBody List<CartItemRequest> cartItemsRequest) {

        // Step 1: Fetch or create the cart for the user
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
            // Use the existing cart
            cart = carts.get(0);
        }

        // Step 2: Process each item in the request list
        for (CartItemRequest itemRequest : cartItemsRequest) {
            Optional<Book> bookOptional = bookRepository.findById(itemRequest.getBookId());
            if (bookOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Book with ID " + itemRequest.getBookId() + " not found");
            }

            // Check if the book already exists in the cart
            Book book = bookOptional.get();
            boolean itemExists = false;

            for (CartItem existingItem : cart.getCartItems()) {
                if (existingItem.getBook().getBookId().equals(book.getBookId())) {
                    // Update quantity if the book already exists in the cart
                    existingItem.setQuantity(existingItem.getQuantity() + itemRequest.getQuantity());
                    itemExists = true;
                    break;
                }
            }

            if (!itemExists) {
                // Add a new item to the cart if it doesn't exist
                CartItem newCartItem = new CartItem();
                newCartItem.setCart(cart);
                newCartItem.setBook(book);
                newCartItem.setQuantity(itemRequest.getQuantity());
                cart.getCartItems().add(newCartItem);
            }
        }

        // Save the updated cart
        cartRepository.save(cart);

        return ResponseEntity.ok("Books added to cart");
    }

    // API to get all carts with their items and owner details

    @PostMapping("/{peopleId}/add")
    @PreAuthorize("hasRole('admin')")
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

//    @GetMapping("/{peopleId}")
//    public ResponseEntity<?> getCartItems(@PathVariable Integer peopleId) {
//        List<CartItemResponseEntity> cartItems = cartRepository.findCartItemsByPeopleId(peopleId);
//        if (cartItems.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("There are no cart items in the cart");
//        }
//        return ResponseEntity.ok(cartItems);
//    }


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