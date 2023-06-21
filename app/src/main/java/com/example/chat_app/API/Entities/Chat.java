package com.example.chat_app.API.Entities;

import java.util.List;

public class Chat {

    private int id;

    private List<UserDetails> users;

    private List<Message> messages;

    public Chat(int id, List<UserDetails> users, List<Message> messages) {
        this.id = id;
        this.users = users;
        this.messages = messages;
    }

    public int getId() {
        return id;
    }

    public List<UserDetails> getUsers() {
        return users;
    }

    public List<Message> getMessages() {
        return messages;
    }
}
