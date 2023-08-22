package com.example.player;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/player")
@RequiredArgsConstructor
public class PlayerController {
    private final PlayerService playerService;
    @PutMapping("/unstuck")
    public void unstuck(@CookieValue( name = "jwt" ) String token) {
        /*
        try {
            DecodedJWT decodedJWT = verifier.verify(token);
            playerService.unstuck(decodedJWT.getClaim("id").asInt());
        } catch (JWTCreationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
         */
    }
}
