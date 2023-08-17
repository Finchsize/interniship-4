package com.example.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Base64;
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


    @GetMapping("/exists/{name}")
    public boolean userExistsByName(@PathVariable String name) {
        return userService.userExistsByName(name);
    }


    @Value
    @Builder
    @Jacksonized
    static class ResetPasswordDTO {
        String email;
    }
    @PutMapping("/reset-password")
    @ResponseStatus(HttpStatus.OK)
    public String resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        return userService.setRandomPassword(resetPasswordDTO.getEmail());
    }

    @GetMapping("/online")
    public Online getNumberOfPlayersOnline() { return userService.getNumberOfUsersOnline(); }

    @PutMapping("/change-password")
    public void changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        userService.changePassword(changePasswordDTO);
    }

    @Value
    @Builder
    @Jacksonized
    static class ChangePasswordDTO {
        String nickname;
        String oldPassword;
        String newPassword;
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user, HttpServletResponse response) {
        final Optional<User> specifiedUser = userService.findUserByName(user.getName());

        if (specifiedUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No user with specified name found");
        }

        if (!specifiedUser.get().getPassword().equals(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password");
        }

        try {
            final var expirationDateSeconds = (System.currentTimeMillis() + 60 * 5 * 1000L) / 1000L;
            final var jwt = JWT.create().withClaim("id", specifiedUser.get().getId()).withIssuedAt(new Date()).withExpiresAt(new Date(expirationDateSeconds * 1000L)).sign(jwtAlgorithm);
            Cookie jwtCookie = new Cookie("jwt", jwt);
            jwtCookie.setMaxAge((int)expirationDateSeconds);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setAttribute("sameSite", "lax");
            response.addCookie(jwtCookie);
            return "success";
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Encountered error while creating a JWT.", exception);
        }
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user, HttpServletResponse response) {
        User newUser = userService.saveUser(user);
        try {
            final var expirationDateSeconds = (System.currentTimeMillis() + 60 * 5 * 1000L) / 1000L;
            final var jwt = JWT.create().withClaim("id", newUser.getId()).withIssuedAt(new Date()).withExpiresAt(new Date(expirationDateSeconds * 1000L)).sign(jwtAlgorithm);
            Cookie jwtCookie = new Cookie("jwt", jwt);
            jwtCookie.setMaxAge((int)expirationDateSeconds);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setAttribute("sameSite", "none");
            response.addCookie(jwtCookie);
            return "success";
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Encountered error while creating a JWT.", exception);
        }
    }
}
