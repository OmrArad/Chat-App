package com.example.chat_app.Model.Repositories;

import android.app.Application;
import android.util.Log;

import androidx.lifecycle.LiveData;

import com.example.chat_app.API.ChatAPI;
import com.example.chat_app.Model.AppDB;
import com.example.chat_app.Model.DAOs.ChatDao;
import com.example.chat_app.Model.Entities.Chat;

import java.util.List;
import java.util.concurrent.Executor;


public class ChatRepository {
    private ChatDao chatDao;
    private LiveData<List<Chat>> allChats;

    private Executor dbExecutor;

    private ChatAPI chatAPI;


    public ChatRepository(Application application) {
        AppDB appDB = AppDB.getInstance(application);
        chatDao = appDB.chatDao();
        allChats = chatDao.getAllChats();
        dbExecutor = appDB.getDatabaseExecutor();
        chatAPI = new ChatAPI(this);
    }

    public void insertChat(Chat chat) {
        dbExecutor.execute(() -> chatDao.insertChat(chat));
    }

    public void addContact(String username) {
        dbExecutor.execute(() -> {
            try {
                chatAPI.addContact(username);
                chatAPI.getAllChats();
            } catch (Exception e) {
                Log.e(this.getClass().getSimpleName(), e.getMessage());
            }
        });
    }

    public void insertChats(List<Chat> chats) {
        // use chatApi
        dbExecutor.execute(() -> chatDao.insertChats(chats));
    }

//    public void deleteChatById(int chatId) {
//        dbExecutor.execute(() -> {
//            Chat chat = chatDao.getChatById(chatId).getValue();
//            chatDao.deleteChat(chat);
//        });
//    }

    public void deleteChat(Chat chat) {
        dbExecutor.execute(() -> {
            // delete chat from room
            chatDao.deleteChat(chat);
            // delete chat from server
            try {
                chatAPI.deleteChatById(chat.getId());
            } catch (Exception e) {
                Log.e(this.getClass().getSimpleName(), e.getMessage());
            }
            this.reload();
        });
    }

    public void reload() {
        chatAPI.getAllChats();
    }

//    public void deleteAllChats() {
//        dbExecutor.execute(chatDao::deleteAllChats);
//    }

    public LiveData<List<Chat>> getAllChats() {
        return allChats;
    }

//    public LiveData<Chat> getChatById(int chatId) {
//        return chatDao.getChatById(chatId);
//    }
}

