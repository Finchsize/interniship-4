package com.example.player;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.example.jsonwebtoken.JsonWebToken;
import com.example.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/player")
@RequiredArgsConstructor
public class PlayerController {
    private final PlayerService playerService;
    JsonWebToken jsonWebToken = new JsonWebToken();

    @GetMapping("/top-nobility")
    public Page<Player> getTopNobility(@RequestParam int page, @RequestParam int limit) {
        return playerService.getTopNobility(page, limit);
    }

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
