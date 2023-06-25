package com.example.chat_app;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.example.chat_app.ContactsPage.Contact;
import com.example.chat_app.ContactsPage.ContactDao;

@Database(entities = {Contact.class}, version = 1)
public abstract class AppDB extends RoomDatabase {

    private static AppDB instance;
    public abstract ContactDao contactDao();

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
