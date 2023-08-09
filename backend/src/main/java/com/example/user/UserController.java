package com.example.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import lombok.RequiredArgsConstructor;
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

    private final UserService userService;

    Algorithm jwtAlgorithm = Algorithm.HMAC256("449d0065577de8cc67efc7abe049ef5514cc29a8ebc28dbd120954b24db9e797");

    @GetMapping
    public List<User> findAll() {
        return userService.findUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable int id) {
        return userService.findUserById(id);
    }

    @PostMapping("/exists")
    public boolean userExistsByName(@RequestBody User user) {
        return userService.userExistsByName(user.getName());
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        final Optional<User> specifiedUser = userService.findUserByName(user.getName());

        if (specifiedUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No user with specified name found");
        }

        if (!specifiedUser.get().getPassword().equals(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password");
        }

        try {
            return JWT.create().withClaim("id", specifiedUser.get().getId()).withIssuedAt(new Date()).withExpiresAt(new Date(System.currentTimeMillis() + 60 * 5 * 1000L)).sign(jwtAlgorithm);
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Encountered error while creating a JWT.", exception);
        }
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        User newUser = userService.saveUser(user);
        try {
            return JWT.create().withClaim("id", newUser.getId()).withIssuedAt(new Date()).withExpiresAt(new Date(System.currentTimeMillis() + 60 * 5 * 1000L)).sign(jwtAlgorithm);
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Encountered error while creating a JWT.", exception);
        }
    }
}
