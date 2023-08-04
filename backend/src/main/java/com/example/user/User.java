package com.example.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "account")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id",unique=true, nullable = false)
    Integer id;
    @Basic(optional = false)
    String name;
    @Basic(optional = false)
    String password;
    String netbar_ip;
    String superpass;
    @Column(name = "`lock`")
    @Basic(optional = false)
    int lock;
    @Basic(optional = false)
    int vip;
    @Basic(optional = false)
    int pointtime;
    @Basic(optional = false)
    int idnumber;
    @Basic(optional = false)
    int phone;
    @Basic(optional = false)
    String email;
    int ip_mask;
    int banned;
    String securityQuestion;
    String answer;
    @Basic(optional = false)
    String sex = "";
    @Basic(optional = false)
    String voting_points = "";
    String realname;
    String securityCode;
    String day;
    String month;
    String year;
    String country;
    String city;
    String state;
    String reg_date;
    String reg_ip;
}
