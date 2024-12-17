package com.library.LMS.controller;

import com.library.LMS.entity.People;
import com.library.LMS.repository.PeopleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/people")
public class PeopleController {

    private final PeopleRepository peopleRepository;

    public PeopleController(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    @GetMapping("")
    public List<People> findAll() {
        return peopleRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> createPerson(@RequestBody People person) {
        // Validate required fields
        if (person.getEmail() == null || person.getFirstName() == null || person.getHash() == null || person.getType() == null || person.getAddress() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        try {
            peopleRepository.save(person);
            return ResponseEntity.ok("Person created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating person: " + e.getMessage());
        }
    }

/*
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public void create(@RequestBody People people) {
        peopleRepository.create(people);
    }

    @GetMapping("/search")
    public List<People> searchBooks(@RequestParam("keyword") String keyword) {
        return peopleRepository.searchPeople(keyword);
    }

 */
}
