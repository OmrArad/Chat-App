package com.example.chat_app.Model;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.example.chat_app.Model.DAOs.ChatDao;
import com.example.chat_app.Model.DAOs.MessageDao;
import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.Message;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Database(entities = {Chat.class, Message.class}, version = 3)
public abstract class AppDB extends RoomDatabase {

    private static AppDB instance;

    private Executor databaseExecutor = Executors.newSingleThreadExecutor();

    public abstract ChatDao chatDao();
    public abstract MessageDao messageDao();

    public static synchronized AppDB getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context.getApplicationContext(),
                            AppDB.class, "AppDB")
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return instance;
    }

    public Executor getDatabaseExecutor() {
        return databaseExecutor;
    }
}
