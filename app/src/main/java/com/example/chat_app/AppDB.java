package com.example.chat_app;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.example.chat_app.ContactsPage.Contact;
import com.example.chat_app.ContactsPage.ContactDao;
import com.example.chat_app.Models.ChatModel.ChatDao;
import com.example.chat_app.Models.ChatModel.Entities.Chat;
import com.example.chat_app.Models.ChatModel.Entities.Message;
import com.example.chat_app.Models.ChatModel.Entities.UserDetails;

@Database(entities = {Contact.class, Chat.class, Message.class, UserDetails.class}, version = 1)
public abstract class AppDB extends RoomDatabase {

    private static AppDB instance;
    public abstract ContactDao contactDao();
    public abstract ChatDao chatDao();

    public static synchronized AppDB getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context.getApplicationContext(),
                            AppDB.class, "AppDB")
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return instance;
    }


}
