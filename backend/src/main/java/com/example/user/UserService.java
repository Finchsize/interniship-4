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

import java.security.SecureRandom;

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

    public boolean userExistsByName(String name) {
        return userRepository.existsByName(name);
    }

    public String setRandomPassword(int length, String email) {
        if(!userRepository.existsByEmail(email)) {
            return "error";
        }
        else {
            final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            SecureRandom random = new SecureRandom();
            StringBuilder password = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.nextInt(chars.length());
                password.append(chars.charAt(randomIndex));
            }

            userRepository.updatePasswordByEmail(password.toString(), email);

            return password.toString();
        }
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

