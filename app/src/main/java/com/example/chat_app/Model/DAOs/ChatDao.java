package com.example.chat_app.Model.DAOs;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.chat_app.Model.Entities.Chat;

import java.util.List;

@Dao
public interface ChatDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertChat(Chat chat);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertChats(List<Chat> chats);

    @Delete
    void deleteChat(Chat chat);

    @Query("DELETE FROM chats")
    void deleteAllChats();

    @Query("SELECT * FROM chats ORDER BY lm_created DESC")
    LiveData<List<Chat>> getAllChats();

    @Query("SELECT * FROM chats WHERE id = :chatId")
    LiveData<Chat> getChatById(int chatId);
}

