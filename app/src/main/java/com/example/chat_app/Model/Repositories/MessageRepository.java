package com.example.chat_app.Model.Repositories;

import android.app.Application;

import androidx.lifecycle.LiveData;

import com.example.chat_app.Model.AppDB;
import com.example.chat_app.Model.DAOs.MessageDao;
import com.example.chat_app.Model.Entities.Message;

import java.util.List;
import java.util.concurrent.Executor;

public class MessageRepository {
    private MessageDao messageDao;
    private LiveData<List<Message>> allMessages;

    private Executor dbExecutor;

    public MessageRepository(Application application) {
        AppDB appDB = AppDB.getInstance(application);
        messageDao = appDB.messageDao();
        allMessages = messageDao.getAllMessages();
        dbExecutor = appDB.getDatabaseExecutor();
    }

    public void insertMessage(Message message) {
        dbExecutor.execute(() -> messageDao.insertMessage(message));
    }

    public void deleteMessage(Message message) {
        dbExecutor.execute(() -> messageDao.deleteMessage(message));
    }

    public void deleteAllMessages() {
        dbExecutor.execute(messageDao::deleteAllMessages);
    }

    public LiveData<List<Message>> getAllMessages() {
        return allMessages;
    }

    public LiveData<List<Message>> getMessagesByChatId(int chatId) {
        return messageDao.getMessagesByChatId(chatId);
    }
}

