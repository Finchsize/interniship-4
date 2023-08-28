package com.example.marketplace;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MarketplaceService {
    private final BankRepository bankRepository;
    private final static int starterMoney = 1000;

    public int getMoney(int user_id) {
        BankAccount bankAccount;
        try {
            bankAccount = bankRepository.findById(user_id).orElseThrow();
        } catch(NoSuchElementException exception) {
            bankAccount = new BankAccount(user_id, starterMoney);
            bankRepository.save(bankAccount);
        }
        return bankAccount.getMoney();
    }
}
