package com.library.LMS.controller;
import com.library.LMS.entity.People;
import com.library.LMS.repository.PeopleRepository;
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
    private final PeopleRepository peopleRepository;

    public LoginController(UserRepository userRepository, PeopleRepository peopleRepository) {
        this.userRepository = userRepository;
        this.peopleRepository = peopleRepository;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponseEntity> login(@RequestParam String email, @RequestParam String password) {
        boolean isValidUser = peopleRepository.validatePassword(email, password);
        if (isValidUser) {
            String role = peopleRepository.findByEmail(email).getType().name();
            String token = jwtService.generateToken(email, role);
            People person = peopleRepository.findByEmail(email);
            LoginResponseEntity response = new LoginResponseEntity(token, role, person);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
    @GetMapping("/verify")
    public ResponseEntity<VerifyResponseEntity> verifyToken(@RequestParam String token) {
        if (jwtService.validateToken(token)) {
            String email = jwtService.extractUsername(token);
            String role = peopleRepository.findByEmail(email).getType().name();
            VerifyResponseEntity response = new VerifyResponseEntity(email, role);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
}
