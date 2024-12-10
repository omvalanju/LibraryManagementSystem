package com.library.LMS.controller;

import com.library.LMS.entity.Book;
import com.library.LMS.repository.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
//@CrossOrigin(origins = "*")
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping("")
    public ResponseEntity<List<Book>> findAll() {
        List<Book> books = bookRepository.findAll();
        return ResponseEntity.ok(books);
    }
  
    //---------------------------you can use this ↓ to implement 'Only admins can access'.
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<String> create(@RequestBody Book book) {
        try {
            validateBook(book); // Perform validation before saving
            bookRepository.create(book);
            return ResponseEntity.status(HttpStatus.CREATED).body("Book created successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /*
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam("keyword") String keyword) {
        List<Book> books = bookRepository.searchBooks(keyword);
        if (books.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(books);
        }
        return ResponseEntity.ok(books);
    }

     */

    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestParam("keyword") String keyword) {
        List<Map<String, Object>> books = bookRepository.searchBooks(keyword);
        if (books.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No books found matching the keyword.");
        }
        return ResponseEntity.ok(books);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable int id) {
        Optional<Book> book = bookRepository.findById(id);
        if (book.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found with ID: " + id);
        }

        boolean deleted = bookRepository.deleteById(id);
        if (deleted) {
            return ResponseEntity.ok("Book deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete the book.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findById(@PathVariable int id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    private void validateBook(Book book) {
        if (book.getBookTitle() == null || book.getBookTitle().isBlank()) {
            throw new IllegalArgumentException("Book title cannot be empty.");
        }
        if (book.getAuthorName() == null || book.getAuthorName().isBlank()) {
            throw new IllegalArgumentException("Author name cannot be empty.");
        }
        if (book.getPublisher() == null || book.getPublisher().getPublisherId() <= 0) {
            throw new IllegalArgumentException("Publisher ID must be valid.");
        }
        if (book.getISBN() == null || book.getISBN().isBlank()) {
            throw new IllegalArgumentException("ISBN cannot be empty.");
        }
        if (book.getCopiesAvailable() < 0) {
            throw new IllegalArgumentException("Copies available cannot be negative.");
        }
    }
}
