package com.example.chat_app.Models.ChatModel;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.chat_app.Models.ChatModel.Entities.ChatWithMessages;
import com.example.chat_app.Models.ChatModel.Entities.Message;

import java.util.List;

@Dao
public interface ChatDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertChat(ChatWithMessages chat);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertChats(List<ChatWithMessages> chats);

    @Delete
    void deleteChatById(int id);

    @Insert
    void addMessage(Message message);

    @Insert
    void addMessages(List<Message> messages);

    @Query("SELECT * FROM messages WHERE chatId = :chatId")
    LiveData<List<Message>> getMessagesByChatId(int chatId);
}

