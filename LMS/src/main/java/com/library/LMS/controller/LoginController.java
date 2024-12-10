package com.library.LMS.controller;
import com.library.LMS.repository.UserRepository;
import com.library.LMS.responseEntity.LoginResponseEntity;
import com.library.LMS.responseEntity.VerifyResponseEntity;
import com.library.LMS.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {
    private final JwtUtil jwtService = new JwtUtil();
    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponseEntity> login(@RequestParam String email, @RequestParam String hashedPassword) {
        boolean isValidUser = userRepository.validateUser(email, hashedPassword);
        if (isValidUser) {
            String role = userRepository.getUserRole(email); // get the client's username
            String token = jwtService.generateToken(email,role);  // generate a token
            LoginResponseEntity response = new LoginResponseEntity(token,role,email);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
    @GetMapping("/verify")
    public ResponseEntity<VerifyResponseEntity> verifyToken(@RequestParam String token) {
        if (jwtService.validateToken(token)) {
            String email = jwtService.extractUsername(token);
            String role = userRepository.getUserRole(email);
            VerifyResponseEntity response = new VerifyResponseEntity(email,role);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
}
