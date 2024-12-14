package com.library.LMS.service;
import com.library.LMS.entity.Book;
import com.library.LMS.entity.Publisher;
import com.library.LMS.repository.BookRepository;
import com.library.LMS.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookOrderService {

    @Autowired
    private BookRepository bookRepository; // JPA Repository for books

    @Autowired
    private PublisherRepository publisherRepository; // JPA Repository for publishers

    @Autowired
    private JavaMailSender mailSender;

    public String orderBook(int bookId, int quantity) {
        // Fetch book details
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (bookOptional.isEmpty()) {
            return "Book not found";
        }

        Book book = bookOptional.get();

        // Fetch publisher details
        Publisher publisher = book.getPublisher();
        if (publisher == null) {
            return "Publisher not found for the book";
        }

        // Prepare and send email
        String emailBody = "Dear " + publisher.getPublisherName() + ",\n\n" +
                "We would like to order " + quantity + " copies of the book titled \"" +
                book.getBookTitle() + "\" by " + book.getAuthorName() + ".\n\n" +
                "Please confirm the order.\n\nThank you.";

        sendEmail(publisher.getEmail(), "Book Order Request", emailBody);

        return "Order request sent to the publisher";
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
