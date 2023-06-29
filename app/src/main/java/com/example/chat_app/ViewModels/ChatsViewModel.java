package com.example.chat_app.ViewModels;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Repositories.ChatRepository;

import java.util.List;

public class ChatsViewModel extends AndroidViewModel {

    private ChatRepository chatRepository;

    private LiveData<List<Chat>> allChatsLiveData;

    public ChatsViewModel(@NonNull Application application) {
        super(application);
        chatRepository = new ChatRepository(application);
        allChatsLiveData = chatRepository.getAllChats();
    }

    public LiveData<List<Chat>> getAllChats() {
        return allChatsLiveData;
    }

    public void addContact(String username) {
        chatRepository.addContact(username);
    }

    public void delete(Chat chat) {
        chatRepository.deleteChat(chat);
    }

    public void reload() {
        chatRepository.reload();
    }
}
