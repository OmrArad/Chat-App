package com.example.chat_app.API.Entities;

import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.Model.Entities.UserDetails;

import java.time.Instant;

public class ApiMessage {

    private int id;

    private Instant created;

    private UserDetails sender;

    private String content;

    public ApiMessage(int id, Instant created, UserDetails sender, String content) {
        this.id = id;
        this.created = created;
        this.sender = sender;
        this.content = content;
    }

    public ApiMessage(Message message) {
        this.id = message.getId();
        this.created = message.getCreated();
        this.sender = message.getSender();
        this.content = message.getContent();
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
