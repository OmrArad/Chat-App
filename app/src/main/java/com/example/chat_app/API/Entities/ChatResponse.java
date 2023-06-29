package com.example.chat_app.API.Entities;

import com.example.chat_app.Model.Entities.UserDetails;

import java.util.List;

public class ChatResponse {
    private int id;

    private List<UserDetails> users;

    private List<ApiChatMessage> apiMessages;

    public ChatResponse(int id, List<UserDetails> users, List<ApiChatMessage> messages) {
        this.id = id;
        this.users = users;
        this.apiMessages = messages;
    }

    public int getId() {
        return id;
    }

    public List<UserDetails> getUsers() {
        return users;
    }

    public List<ApiChatMessage> getMessages() {
        return apiMessages;
    }
}
