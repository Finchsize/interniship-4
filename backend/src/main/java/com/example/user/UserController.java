package com.example.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    Algorithm jwtAlgorithm = Algorithm.HMAC256("449d0065577de8cc67efc7abe049ef5514cc29a8ebc28dbd120954b24db9e797");
    JWTVerifier verifier = JWT.require(jwtAlgorithm).build();

    @GetMapping
    public List<User> findAll() {
        return userService.findUsers();
    }

    @GetMapping("/current-user")
    public User getByToken(@CookieValue(name = "jwt") String token) {
        try {
            DecodedJWT decodedJWT = verifier.verify(token);
            Optional<User> user = userService.findUserById(decodedJWT.getClaim("id").asInt());
            if (user.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "No user with specified ID found");
            }
            return user.get();
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
    }

    @GetMapping("/{name}")
    public Optional<User> getByName(@PathVariable String name) { return userService.getUserByName(name); }


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
    public void changePassword(@CookieValue(name = "jwt") String token, @RequestBody ChangePasswordDTO changePasswordDTO) {
        try {
            DecodedJWT decodedJWT = verifier.verify(token);
            Optional<User> user = userService.findUserById(decodedJWT.getClaim("id").asInt());
            if (user.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "No user with specified ID found");
            }
            if (!user.get().getName().equals(changePasswordDTO.getNickname())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You can't change password for another user");
            }
            userService.changePassword(changePasswordDTO);
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
    }

    @Value
    @Builder
    @Jacksonized
    static class ChangePasswordDTO {
        String nickname;
        String oldPassword;
        String newPassword;

    }
    @Value
    @Builder
    @Jacksonized
    static class ChangeEmailDTO {
        String name;
        String email;
    }
    @PutMapping("/change-email")
    public void changeEmail(@CookieValue(name = "jwt") String token, @RequestBody ChangeEmailDTO changeEmailDTO) {
        try {
            DecodedJWT decodedJWT = verifier.verify(token);
            Optional<User> user = userService.findUserById(decodedJWT.getClaim("id").asInt());
            if (user.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "No user with specified ID found");
            }
            if (!user.get().getName().equals(changeEmailDTO.getName())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You can't change password for another user");
            }
            userService.changeEmail(changeEmailDTO);
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
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
            ZonedDateTime expirationDate = ZonedDateTime.now().plusHours(1);
            final var jwt = JWT.create().withClaim("id", specifiedUser.get().getId()).withIssuedAt(new Date()).withExpiresAt(Date.from(expirationDate.toInstant())).sign(jwtAlgorithm);
            Cookie jwtCookie = new Cookie("jwt", jwt);
            jwtCookie.setMaxAge((int)(expirationDate.toEpochSecond() - ZonedDateTime.now().toEpochSecond()));
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(true);
            jwtCookie.setAttribute("sameSite", "lax");
            jwtCookie.setDomain("localhost");
            jwtCookie.setPath("/");
            response.addCookie(jwtCookie);
            return "success";
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Encountered error while creating a JWT.", exception);
        }
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        User newUser = userService.saveUser(user);
        return "success";
    }
}
