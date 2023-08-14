package com.example.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(int id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByName(String name) {
        if (!userRepository.existsByName(name)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Can't find an user with this name.");
        }
        return userRepository.findByName(name);
    }

    public boolean userExistsByName(String name) {
        return userRepository.existsByName(name);
    }

    public Optional<User> findUserByName(String name) {
        return userRepository.findByName(name);
    }

    public Online getNumberOfUsersOnline() {
        List<String> addresses = new ArrayList<>();
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("netstat", "-t");
            Process process = processBuilder.start();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                if (line.contains("ESTABLISHED")) {
                    addresses.add(line.replaceAll(" +", " ").split(" ")[4]);
                }
            }
            bufferedReader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new Online(addresses.size(), (new HashSet<>(addresses)).size());
    }

    public User saveUser(User user) {
        if (userRepository.existsByEmail(user.getEmail()) || userRepository.existsByName(user.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }
        return userRepository.save(user);
    }

}

