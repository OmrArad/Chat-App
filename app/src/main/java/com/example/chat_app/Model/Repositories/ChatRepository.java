package com.example.chat_app.Model.Repositories;

import android.app.Application;

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

    public void insertChats(List<Chat> chats) {
        // use chatApi
        dbExecutor.execute(() -> chatDao.insertChats(chats));
    }

    public void deleteChat(Chat chat) {
        // use chatApi
        dbExecutor.execute(() -> chatDao.deleteChat(chat));
    }

    public void reload() {
        chatAPI.getAllChats();
    }

    public void deleteAllChats() {
        dbExecutor.execute(chatDao::deleteAllChats);
    }

    public LiveData<List<Chat>> getAllChats() {
        return allChats;
    }

    public LiveData<Chat> getChatById(int chatId) {
        return chatDao.getChatById(chatId);
    }
}
