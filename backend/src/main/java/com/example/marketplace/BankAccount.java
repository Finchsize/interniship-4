package com.example.marketplace;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "marketplace_bank")
public class BankAccount {
    @Id
    @Basic(optional = false)
    @Column(name = "id",unique=true, nullable = false)
    Integer id;
    @Basic(optional = false)
    int money;

    public BankAccount(int userId, int starterMoney) {
        id = userId;
        money = starterMoney;
    }
}
