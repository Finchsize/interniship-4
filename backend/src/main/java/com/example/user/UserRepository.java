package com.example.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByName(String name);
    User findByName(String name);
    boolean existsByEmail(String email);
}
