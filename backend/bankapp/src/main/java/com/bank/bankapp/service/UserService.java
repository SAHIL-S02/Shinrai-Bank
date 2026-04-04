package com.bank.bankapp.service;

import com.bank.bankapp.dto.UserRequest;
import com.bank.bankapp.entity.User;
import com.bank.bankapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String register(UserRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.email).isPresent()) {
            return "Email already registered!";
        }

        // Encrypt password
        String encodedPassword = passwordEncoder.encode(request.password);

        // Create user
        User user = new User(
                request.name,
                request.email,
                encodedPassword
        );

        userRepository.save(user);

        return "User registered successfully!";
    }
}