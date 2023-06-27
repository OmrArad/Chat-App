package com.example.chat_app.Models.ChatModel.Entities;

import androidx.room.Embedded;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.io.Serializable;
import java.time.Instant;

@Entity(tableName = "messages")
public class Message implements Serializable {
    @PrimaryKey(autoGenerate = true)
    private int id;

    private int chatId;

    private Instant created;

    private String content;

    @Embedded
    private UserDetails sender;

    public Message(int chatId, Instant created, String content, UserDetails sender) {
        this.chatId = chatId;
        this.created = created;
        this.content = content;
        this.sender = sender;
    }

    public int getChatId() {
        return chatId;
    }

    public int getId() {
        return id;
    }

    public Instant getCreated() {
        return created;
    }

    public String getContent() {
        return content;
    }

    public UserDetails getSender() {
        return sender;
    }
}
