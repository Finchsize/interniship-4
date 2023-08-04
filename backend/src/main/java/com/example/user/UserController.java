package com.example.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    // Find all users
    @GetMapping
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Find user by id
    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable int id) {
        return userRepository.findById(id);
    }

    // Register a new user
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // Check if user with specified name or email exists
        if (userRepository.existsByName(user.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Name is already taken");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already taken");
        }

        // Save new user to the database
        User newUser = userRepository.save(user);
        return newUser;
    }

    // Delete an user
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }
}
