package com.example.player;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlayerService {
    private final PlayerRepository playerRepository;
    public void unstuck(int id) {
        Optional<Player> player = playerRepository.findById(id);
        if (player.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No player with specified ID found");
        }
        player.get().setRecordx(429);
        player.get().setRecordy(378);
        playerRepository.save(player.get());
    }
}
