package com.example.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "account")
public class User {
    @Id
    Integer id;
    String name;
    String password;
    String netbar_ip;
    String superpass;
    int lock;
    int vip;
    int pointtime;
    int idnumber;
    int phone;
    String email;
    int ip_mask;
    boolean banned;
    //    @Column(name = "SecurityQuestion")
//    String securityQuestion;
    String answer;
    String sex;
    String voting_points;
    String realname;
    //    @Column(name = "SecurityCode")
//    String securityCode;
    String day;
    String month;
    String year;
    String country;
    String city;
    String state;
    String reg_date;
    String reg_ip;
}
