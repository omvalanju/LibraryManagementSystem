package com.library.LMS.controller;

import com.library.LMS.entity.Book;
import com.library.LMS.entity.Publisher;
import com.library.LMS.repository.PublisherRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/publishers")
public class PublisherController {

    private final PublisherRepository publisherRepository;

    public PublisherController(PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }

    // Create a new publisher
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('admin')")
    public void create(@RequestBody Publisher publisher) {
        publisherRepository.create(publisher);
    }

    // Get all publishers
    @GetMapping("")
    @PreAuthorize("hasRole('admin')")
    public List<Publisher> findAll() {
        return publisherRepository.findAll();
    }

    // Get a publisher by ID
    @GetMapping("/search/{id}")
    public ResponseEntity<Publisher> findById(@PathVariable Integer id) {
        Optional<Publisher> publisher = publisherRepository.findById(id);
        return publisher.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update a publisher by ID
    @PutMapping("/update")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<String> update(@RequestBody Publisher publisher) {
        boolean updated = publisherRepository.update(publisher);
        if (updated) {
            return ResponseEntity.ok("{\"message\": \"Publisher updated successfully\"}");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Publisher not found\"}");
        }
    }

    //Delete publisher by ID
    @DeleteMapping("/deleteById/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<String> deleteById(@PathVariable int id) {
        Optional<Publisher> publisher = publisherRepository.findById(id);
        if (publisher.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Publisher not found with ID: " + id);
        }

        boolean deleted = publisherRepository.deleteById(id);
        if (deleted) {
            return ResponseEntity.ok("Publisher deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete the book.");
        }
    }

    // Search publishers by keyword
    @GetMapping("/search")
    public ResponseEntity<List<Publisher>> searchPublisher(@RequestParam("keyword") String keyword) {
        List<Publisher> publisher = publisherRepository.searchPublisher(keyword);
        if (publisher.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(publisher);
        }
        return ResponseEntity.ok(publisher);
    }
}
