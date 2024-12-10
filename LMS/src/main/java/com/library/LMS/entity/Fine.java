package com.library.LMS.entity;

import com.library.LMS.entity.Book;
import com.library.LMS.entity.People;
import jakarta.persistence.*;

@Entity
@Table(name = "fines")
public class Fine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fine_id")
    private Integer fineId;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(name = "people_id", nullable = false)
    private People people;

    @Column(name = "fine_amount", nullable = false)
    private Integer fineAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private FineStatus status;


    public Fine() {
    }

    public Fine(Book book, People people, Integer fineAmount, FineStatus status) {
        this.book = book;
        this.people = people;
        this.fineAmount = fineAmount;
        this.status = status;
    }


    public Integer getFineId() {
        return fineId;
    }

    public void setFineId(Integer fineId) {
        this.fineId = fineId;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public People getPeople() {
        return people;
    }

    public void setPeople(People people) {
        this.people = people;
    }

    public Integer getFineAmount() {
        return fineAmount;
    }

    public void setFineAmount(Integer fineAmount) {
        this.fineAmount = fineAmount;
    }

    public FineStatus getStatus() {
        return status;
    }

    public void setStatus(FineStatus status) {
        this.status = status;
    }

    public enum FineStatus {
        DUE,
        PAID
    }

}
