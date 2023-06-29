package com.example.chat_app.API.Entities;

public class ApiNewContact {
    private String username;

    public ApiNewContact(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
