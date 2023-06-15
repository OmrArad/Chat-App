package com.example.chat_app.ChatPage;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.example.chat_app.ContactsPage.Contact;

import java.util.List;

@Entity
public class Chat {

    // should we use a local numbering scheme or use the chat id from the database?
    // if we use the id from the database, how can we assign id's for new chats in the client?
    @PrimaryKey(autoGenerate = true)
    private int id;

    private Contact chatContact;

    private List<Message> messages;

    public Chat(Contact chatContact, List<Message> messages) {
        this.chatContact = chatContact;
        this.messages = messages;
    }

    // empty chat constructor
    public Chat(Contact chatContact) {
        this.chatContact = chatContact;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Contact getChatContact() {
        return chatContact;
    }

    public List<Message> getMessages() {
        return messages;
    }
}
