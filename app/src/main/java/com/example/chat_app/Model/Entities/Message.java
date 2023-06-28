package com.example.chat_app.Model.Entities;

import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.room.Embedded;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverter;
import androidx.room.TypeConverters;

import com.example.chat_app.API.Entities.ApiMessage;
import com.example.chat_app.Model.Entities.UserDetails;

import java.time.Instant;

@Entity(tableName = "messages")
public class Message {
    @PrimaryKey
    private int id;

    private int chatId;

    @TypeConverters({InstantConverter.class})
    private Long created; // Converted to Long

    private String content;

    @Embedded
    private UserDetails sender;

    public Message(int id, int chatId, Long created, String content, UserDetails sender) {
        this.id = id;
        this.chatId = chatId;
        this.created = created;
        this.content = content;
        this.sender = sender;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public Message(int chatId, ApiMessage apiMessage) {
        this.id = apiMessage.getId();
        this.chatId = chatId;
        this.created = apiMessage.getCreated();
        this.content = apiMessage.getContent();
        this.sender = apiMessage.getSender();
    }

    public int getChatId() {
        return chatId;
    }

    public int getId() {
        return id;
    }

    public Long getCreated() {
        return created;
    }

    public String getContent() {
        return content;
    }

    public UserDetails getSender() {
        return sender;
    }

    public static class InstantConverter {
        @TypeConverter
        public static Instant fromTimestamp(Long value) {
            return value == null ? null : Instant.ofEpochMilli(value);
        }

        @TypeConverter
        public static Long toTimestamp(Instant instant) {
            return instant == null ? null : instant.toEpochMilli();
        }
    }
}
