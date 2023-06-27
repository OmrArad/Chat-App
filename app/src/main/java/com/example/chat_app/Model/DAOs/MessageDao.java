package com.example.chat_app.Model.DAOs;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;

import com.example.chat_app.Model.Entities.Message;

import java.util.List;

@Dao
public interface MessageDao {
    @Insert
    void insertMessage(Message message);

    @Delete
    void deleteMessage(Message message);

    @Query("DELETE FROM messages")
    void deleteAllMessages();

    @Query("SELECT * FROM messages")
    LiveData<List<Message>> getAllMessages();

    @Query("SELECT * FROM messages WHERE chatId = :chatId")
    LiveData<List<Message>> getMessagesByChatId(int chatId);
}







