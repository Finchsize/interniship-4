package com.example.player;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PlayerService {
    private static final int spawnX = 429;
    private static final int spawnY = 378;
    private static final int mapId = 1002;

    private final PlayerRepository playerRepository;
    public void unstuck(int id) {
        final var player = playerRepository.findByAccountId(id);
        if (player.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No player with specified ID found");
        }
        player.get().setRecordx(spawnX);
        player.get().setRecordy(spawnY);
        player.get().setRecordMapId(1002);
        playerRepository.save(player.get());
    }

    public Page<Player> getTopNobility(int page, int limit) {
        return playerRepository.findAll(PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "donation")));
    }
}
