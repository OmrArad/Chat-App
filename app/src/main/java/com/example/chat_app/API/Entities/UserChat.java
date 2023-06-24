package com.example.chat_app.API.Entities;

public class UserChat {

    private int id;

    private UserDetails user;

    private Message lastMessage;

    public UserChat(int id, UserDetails user, Message lastMessage) {
        this.id = id;
        this.user = user;
        this.lastMessage = lastMessage;
    }

    public int getId() {
        return id;
    }

    public UserDetails getUser() {
        return user;
    }

    public Message getLastMessage() {
        return lastMessage;
    }
}
