package com.example.marketplace;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.example.user.User;
import com.example.user.UserController;
import com.example.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {
    private final MarketplaceService marketplaceService;
    private final UserService userService;

    Algorithm jwtAlgorithm = Algorithm.HMAC256("449d0065577de8cc67efc7abe049ef5514cc29a8ebc28dbd120954b24db9e797");
    JWTVerifier verifier = JWT.require(jwtAlgorithm).build();

    @GetMapping("/money")
    @ResponseStatus(HttpStatus.OK)
    public int getMoney(@CookieValue(name = "jwt") String token) {
        try {
            final var decodedJWT = verifier.verify(token);
            return marketplaceService.getMoney(decodedJWT.getClaim("id").asInt());
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
    }
}
