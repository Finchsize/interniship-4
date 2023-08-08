package com.example.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.InetAddress;
import java.util.ArrayList;
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

    public Optional<User> findUserByName(String name) {
        return userRepository.findByName(name);
    }

    public int getNumberOfUsersOnline() {
        List<User> users = userRepository.findAll();
        List<String> ips = new ArrayList<String>();
        for (User user: users) {
            try {
                if (InetAddress.getByName(user.getNetbar_ip()).isReachable(500)) {
                    // Before adding the ip, check if it is already in the list and is valid
                    if (!ips.contains(user.getNetbar_ip()) && user.getNetbar_ip() != null) {
                        System.out.println(user.getNetbar_ip());
                        ips.add(user.getNetbar_ip());
                    }
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return ips.size();
    }

    public User saveUser(User user) {
        if (userRepository.existsByEmail(user.getEmail()) || userRepository.existsByName(user.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }
        return userRepository.save(user);
    }

}
