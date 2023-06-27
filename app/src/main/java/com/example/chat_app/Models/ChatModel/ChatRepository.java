package com.example.chat_app.Models.ChatModel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.chat_app.API.Entities.Chat;

import java.util.ArrayList;
import java.util.List;

public class ChatRepository {

    private ChatListData chatListData;

    public ChatRepository() {
        chatListData = new ChatListData();
    }

    private class ChatListData extends MutableLiveData<List<Chat>> {
        public ChatListData() {
            super();
            setValue(new ArrayList<>());
        }
    }

    public LiveData<List<Chat>> getAllChats() {
        return chatListData;
    }
}
