package com.example.chat_app.ChatPage;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.time.Instant;

@Entity
public class Message {

    @PrimaryKey(autoGenerate = true)
    private int id;

    Instant created;

    String sender;

    String content;

    public Message(Instant created, String sender, String content) {
        this.created = created;
        this.sender = sender;
        this.content = content;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public Instant getCreated() {
        return created;
    }

    public String getSender() {
        return sender;
    }

    public String getContent() {
        return content;
    }
}
