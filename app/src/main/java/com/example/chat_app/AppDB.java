package com.example.chat_app;

import androidx.room.Database;
import androidx.room.RoomDatabase;

import com.example.chat_app.ContactsPage.Contact;
import com.example.chat_app.ContactsPage.ContactDao;

@Database(entities = {Contact.class}, version = 1)
public abstract class AppDB extends RoomDatabase {
    public abstract ContactDao contactDao();
}
