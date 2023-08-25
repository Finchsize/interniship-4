package com.example.marketplace;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BankRepository extends JpaRepository<BankAccount, Integer> {

    @Override
    Optional<BankAccount> findById(Integer integer);

    @Override
    boolean existsById(Integer integer);

}