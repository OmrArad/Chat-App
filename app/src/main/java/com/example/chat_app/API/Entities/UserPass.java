package com.example.chat_app.API.Entities;

public class UserPass {

    private final String username;

    private final String password;

    public UserPass(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
