package com.example.player;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.example.jsonwebtoken.JsonWebToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/player")
@RequiredArgsConstructor
public class PlayerController {
    private final PlayerService playerService;
    private final JsonWebToken jsonWebToken;
    @PutMapping("/unstuck")
    public void unstuck(@CookieValue( name = "jwt" ) String token) {
        try {
            final var decodedJWT = jsonWebToken.getVerifier().verify(token);
            playerService.unstuck(decodedJWT.getClaim("id").asInt());
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
    }
}
