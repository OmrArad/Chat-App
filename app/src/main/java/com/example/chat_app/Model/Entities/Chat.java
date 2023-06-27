package com.example.chat_app.Model.Entities;

import androidx.room.Embedded;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "chats")
public class Chat {
    @PrimaryKey
    private int id;

    @Embedded
    private UserDetails contact;

    public Chat(int id, UserDetails contact) {
        this.id = id;
        this.contact = contact;
    }

    public int getId() {
        return id;
    }
}
