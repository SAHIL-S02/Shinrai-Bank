package com.bank.bankapp.service;

import com.bank.bankapp.dto.UserRequest;
import com.bank.bankapp.entity.User;
import com.bank.bankapp.repository.UserRepository;
import com.bank.bankapp.entity.Account;
import com.bank.bankapp.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.bank.bankapp.config.JwtUtil;
import com.bank.bankapp.dto.LoginRequest;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(UserRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.email).isPresent()) {
            return "Email already registered!";
        }

        // Check if mobile already exists
        if (userRepository.findByMobile(request.mobile).isPresent()) {
            return "Mobile number already registered!";
        }

        // Encrypt password
        String encodedPassword = passwordEncoder.encode(request.password);

        // Create user
        User user = new User(
                request.name,
                request.email,
                request.mobile,
                encodedPassword,
                request.aadharNumber,
                request.address
        );

        userRepository.save(user);

        // Generate 10-digit account number
        long min = 1000000000L;
        long max = 9999999999L;
        long randomNum = min + (long)(Math.random() * (max - min));
        String accountNumber = String.valueOf(randomNum);

        // Create account
        Account account = new Account(
                user,
                accountNumber,
                request.accountType != null && !request.accountType.isEmpty() ? request.accountType : "SAVINGS",
                request.balance != null ? request.balance : 0.0,
                request.nickname
        );
        accountRepository.save(account);

        return "User registered successfully!";
    }

    public String login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByMobile(request.mobile);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(request.password, user.getPassword())) {
                return jwtUtil.generateToken(user.getMobile());
            }
        }
        throw new RuntimeException("Invalid credentials!");
    }
}