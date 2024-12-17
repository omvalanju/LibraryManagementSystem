package com.library.LMS.repository;

import com.library.LMS.entity.Fine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FineRepository extends JpaRepository<Fine, Integer> {
    Optional<Fine> findByPeople_PeopleId(Integer peopleId);
}
