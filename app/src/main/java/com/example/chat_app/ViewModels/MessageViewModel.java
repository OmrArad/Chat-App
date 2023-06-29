package com.example.chat_app.ViewModels;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.Model.Repositories.MessageRepository;

import java.util.List;

public class MessageViewModel extends AndroidViewModel {

    private MessageRepository messageRepository;
    private LiveData<List<Message>> messageListData;

    private int chatId;

//    public int getChatId() {
//        return chatId;
//    }

    public void loadChatMessages(int chatId) {
        this.chatId = chatId;
        this.reload();
    }

    public MessageViewModel(@NonNull Application application) {
        super(application);
        messageRepository = new MessageRepository(application);
        // Initialize the message list or fetch it from the database
    }

    public LiveData<List<Message>> getAllMessages() {
        return messageListData;
    }

//    public void addMessage(Message message) {
//        List<Message> messageList = messageListData.getValue();
//        if (messageList == null) {
//            messageList = new ArrayList<>();
//        }
//        messageList.add(message);
//        messageListData.setValue(messageList);
//    }

    public void sendMessage(String messageContent) {
        messageRepository.sendMessage(chatId, messageContent);
        this.reload();
    }

//    public void delete(Message message) {
//        messageRepository.deleteMessage(message);
//    }


    public void reload() {
        messageListData = messageRepository.getMessagesByChatId(chatId);
    }
}
