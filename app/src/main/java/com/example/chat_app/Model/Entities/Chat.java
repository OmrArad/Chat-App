package com.example.chat_app.Model.Entities;

import androidx.room.Embedded;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.io.Serializable;

@Entity(tableName = "chats")
public class Chat implements Serializable {
    @PrimaryKey//(autoGenerate = true)
    private int id;

    @Embedded
    private UserDetails contact;

    @Embedded(prefix = "lm_")
    private Message lastMessage;

    public Chat(int id, UserDetails contact, Message lastMessage) {
        this.id = id;
        this.contact = contact;
        this.lastMessage = lastMessage;
    }

    public int getId() {
        return id;
    }

    public UserDetails getContact() {
        return contact;
    }

    public Message getLastMessage() {
        return lastMessage;
    }
}
