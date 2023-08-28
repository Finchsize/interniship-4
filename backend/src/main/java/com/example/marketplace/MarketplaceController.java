package com.example.marketplace;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {
    private final MarketplaceService marketplaceService;
    Algorithm jwtAlgorithm = Algorithm.HMAC256("449d0065577de8cc67efc7abe049ef5514cc29a8ebc28dbd120954b24db9e797");
    JWTVerifier verifier = JWT.require(jwtAlgorithm).build();

    @GetMapping("/money")
    @ResponseStatus(HttpStatus.OK)
    public int getMoney(@CookieValue(name = "jwt") String token) {
        try {
            final var decodedJWT = verifier.verify(token);
            final var user_id = decodedJWT.getClaim("id").asInt();
            return marketplaceService.getMoney(user_id);
        } catch (JWTVerificationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
    }
}
