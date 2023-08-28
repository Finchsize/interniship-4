package com.example.player;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigInteger;

@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "cq_user")
public class Player {
    @Id
    int id;
    String name;
    @Column(name = "account_id")
    int accountId;
    @Column(name = "recordmap_id")
    int recordMapId;
    int recordx;
    int recordy;
    BigInteger donation;
}
