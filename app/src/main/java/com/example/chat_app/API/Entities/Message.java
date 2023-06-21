package com.example.chat_app.API.Entities;

import java.time.Instant;

public class Message {

    private int id;

    private Instant created;

    private UserDetails sender;

    private String content;

    public Message(int id, Instant created, UserDetails sender, String content) {
        this.id = id;
        this.created = created;
        this.sender = sender;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public Instant getCreated() {
        return created;
    }

    public UserDetails getSender() {
        return sender;
    }

    public String getContent() {
        return content;
    }
}
