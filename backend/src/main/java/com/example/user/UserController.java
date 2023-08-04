package com.example.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    // JWT algorithm
    Algorithm algorithm = Algorithm.HMAC256("449d0065577de8cc67efc7abe049ef5514cc29a8ebc28dbd120954b24db9e797");

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
    public String registerUser(@RequestBody User user) {
        // Check if user with specified name or email exists
        if (userRepository.existsByName(user.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Name is already taken");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already taken");
        }

        // Save new user to the database
        User newUser = userRepository.save(user);

        try {
            // Create a JWT
            String token = JWT.create().withClaim("id", newUser.getId()).withIssuedAt(new Date()).withExpiresAt(new Date(System.currentTimeMillis() + 5000L)).sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Encountered error while creating a JWT.", exception);
        }
    }

    // Delete an user
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }
}
