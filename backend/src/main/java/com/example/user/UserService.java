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
    private final static int RANDOM_PASSWORD_LENGTH = 30;

    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No user with specified ID found");
        }
        return user.get();
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

    public String setRandomPassword(String email) {
        if(!userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user with specified email found");
        }
        else {
            final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            SecureRandom random = new SecureRandom();
            StringBuilder password = new StringBuilder();

            for (int i = 0; i < RANDOM_PASSWORD_LENGTH; i++)
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

    public void changePassword(UserController.ChangePasswordDTO changePasswordDTO) {
        final var nickname = changePasswordDTO.getNickname();
        final var oldPassword = changePasswordDTO.getOldPassword();
        Optional<User> user = userRepository.findByName(nickname);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find an user with this name");
        }
        if (!user.get().getPassword().equals(oldPassword)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "The old password does not match");
        }
        user.get().setPassword(changePasswordDTO.getNewPassword());
        userRepository.save(user.get());
    }

    public void changeEmail(UserController.ChangeEmailDTO changeEmailDTO) {
        final var nickname = changeEmailDTO.getName();
        final var user = userRepository.findByName(nickname).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find a user with this nickname"));
        user.setEmail(changeEmailDTO.getEmail());
        userRepository.save(user);
    }
}

