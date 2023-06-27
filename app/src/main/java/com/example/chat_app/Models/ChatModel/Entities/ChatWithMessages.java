package com.example.chat_app.Models.ChatModel.Entities;

import androidx.room.Embedded;
import androidx.room.Relation;

import java.io.Serializable;
import java.util.List;

public class ChatWithMessages implements Serializable {
    @Embedded
    public Chat chat;

    @Relation(
            parentColumn = "id",
            entityColumn = "chatId"
    )
    public List<Message> messages;

}
