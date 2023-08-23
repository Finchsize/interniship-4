package com.example.player;

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
@Table(name = "cq_user")
public class Player {
    @Id
    int id;
    @Column(name = "account_id")
    int accountId;
    int recordx;
    int recordy;
}
