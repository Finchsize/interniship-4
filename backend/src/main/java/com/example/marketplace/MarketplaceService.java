package com.example.marketplace;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MarketplaceService {
    private final BankRepository bankRepository;
    private final static int starterMoney = 0;
    public int getMoney(int user_id) {
        Optional<BankAccount> bankAccount = bankRepository.findById(user_id);
        if(bankAccount.isEmpty()) {
            BankAccount newBankAccount = new BankAccount();
            newBankAccount.setId(user_id);
            newBankAccount.setMoney(starterMoney);
            bankRepository.save(newBankAccount);
            return starterMoney;
        }
        else {
            return bankAccount.get().getMoney();
        }
    }
}
