package com.library.LMS.controller;
import com.library.LMS.service.BookOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookOrder")
//@CrossOrigin(origins = "*")
public class BookOrderController {

    @Autowired
    private BookOrderService bookOrderService;

    @PostMapping("/order")
    public String orderBook(@RequestParam int bookId, @RequestParam int quantity) {
        return bookOrderService.orderBook(bookId, quantity);
    }
}