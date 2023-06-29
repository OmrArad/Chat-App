package com.example.chat_app.API.Entities;

import com.example.chat_app.Model.Entities.Message;


public class ApiMessage {

    private int id;

    private String created;

    private ApiUsername sender;

    private String content;

    public ApiMessage(int id, String created, ApiUsername sender, String content) {
        this.id = id;
        this.created = created;
        this.sender = sender;
        this.content = content;
    }

    public ApiMessage(Message message) {
        this.id = message.getId();
        this.created = message.getCreated();
        this.sender = new ApiUsername(message.getSender().getUsername());
        this.content = message.getContent();
    }

    public int getId() {
        return id;
    }

    public String getCreated() {
        return created;
    }

    public ApiUsername getSender() {
        return sender;
    }

    public String getContent() {
        return content;
    }
}
