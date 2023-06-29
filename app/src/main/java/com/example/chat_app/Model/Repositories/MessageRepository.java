package com.example.chat_app.Model.Repositories;

import android.app.Application;

import androidx.lifecycle.LiveData;

import com.example.chat_app.API.MessageAPI;
import com.example.chat_app.Model.AppDB;
import com.example.chat_app.Model.DAOs.MessageDao;
import com.example.chat_app.Model.Entities.Message;

import java.util.List;
import java.util.concurrent.Executor;

public class MessageRepository {
    private MessageDao messageDao;

    private MessageAPI messageAPI;

    private LiveData<List<Message>> allMessages;

    private Executor dbExecutor;

    public MessageRepository(Application application) {
        AppDB appDB = AppDB.getInstance(application);
        messageDao = appDB.messageDao();
        messageAPI = new MessageAPI(this);
        allMessages = messageDao.getAllMessages();
        dbExecutor = appDB.getDatabaseExecutor();
    }

    public void insertMessage(Message message) {
        dbExecutor.execute(() -> messageDao.insertMessage(message));
    }

    public void insertMessages(List<Message> messages) {
        dbExecutor.execute(() -> messageDao.insertMessages(messages));
    }

    public void deleteMessage(Message message) {
        dbExecutor.execute(() -> messageDao.deleteMessage(message));
    }

    public void deleteMessagesByChatId(int chatId) {
        dbExecutor.execute(() -> messageDao.deleteMessagesByChatId(chatId));
        // TODO: delete from server
    }

    public void deleteAllMessages() {
        dbExecutor.execute(messageDao::deleteAllMessages);
        // TODO: delete from server
    }

    public LiveData<List<Message>> getAllMessages() {
        return allMessages;
    }

    public LiveData<List<Message>> getMessagesByChatId(int chatId) {
        return messageDao.getMessagesByChatId(chatId);
    }
    public void reloadChatMessages(int chatId) {
        dbExecutor.execute(() -> {
            messageAPI.getChatMessages(chatId);
        });
    }

    public void sendMessage(Message message) {
        dbExecutor.execute(() -> {
            messageAPI.sendMessage(message);
            reloadChatMessages(message.getChatId());
        });
    }
}

