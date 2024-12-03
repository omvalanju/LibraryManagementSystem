package com.library.LMS.controller;
import com.library.LMS.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {
    private final JwtUtil jwtService = new JwtUtil();

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        if ("user".equals(username) && "password".equals(password)) {
            String token = jwtService.generateToken(username);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
    @GetMapping("/verify")
    public ResponseEntity<String> verifyToken(@RequestParam String token) {
        if (jwtService.validateToken(token)) {
            String username = jwtService.extractUsername(token);
            return ResponseEntity.ok("Token is valid for user: " + username);
        } else {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
}
