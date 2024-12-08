package com.library.LMS.controller;

import com.library.LMS.entity.Book;
import com.library.LMS.repository.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping("")
    List<Book> findAll(){
        return bookRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    //---------------------------you can use this ↓ to implement 'Only admins can access'.
    @PreAuthorize("hasRole('admin')")
    void create(@RequestBody Book book) {
        bookRepository.create(book);
    }
}
