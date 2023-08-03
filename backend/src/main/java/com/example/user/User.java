package com.example.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String name;
    private String password;
    private String netbar_ip;
    private String superpass;
    private int lock;
    private int vip;
    private int pointtime;
    private int idnumber;
    private int phone;
    private String email;
    private int ip_mask;
    private boolean banned;
    private String SecurityQuestion;
    private String answer;
    private String sex;
    private String voting_points;
    private String realname;
    private String SecurityCode;
    private String day;
    private String month;
    private String year;
    private String country;
    private String city;
    private String state;
    private String reg_date;
    private String reg_ip;
}
