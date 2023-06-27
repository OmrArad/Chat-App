package com.example.chat_app.Models.ChatModel.Entities;

import androidx.room.ColumnInfo;
import androidx.room.Embedded;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.io.Serializable;
import java.util.List;

@Entity(tableName = "chats")
public class Chat implements Serializable {
    @PrimaryKey
    private int id;

    @Embedded
    private List<UserDetails> participants;

    public Chat(int id, List<UserDetails> participants) {
        this.id = id;
        this.participants = participants;
    }

    public int getId() {
        return id;
    }
}
