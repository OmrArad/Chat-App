package com.example.chat_app.Model.DAOs;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.chat_app.Model.Entities.Message;

import java.util.List;

@Dao
public interface MessageDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertMessage(Message message);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertMessages(List<Message> messages);

    @Delete
    void deleteMessage(Message message);

    @Query("DELETE FROM messages")
    void deleteAllMessages();

    @Query("SELECT * FROM messages")
    LiveData<List<Message>> getAllMessages();

    @Query("SELECT * FROM messages WHERE chatId = :chatId")
    LiveData<List<Message>> getMessagesByChatId(int chatId);

    @Query("DELETE FROM messages WHERE chatId = :chatId")
    void deleteMessagesByChatId(int chatId);
}







