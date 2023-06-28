package com.example.chat_app;

import android.app.Application;
import android.content.Context;
import android.view.View;
import android.widget.Toolbar;


public class MyApplication extends Application {
    public static Context context;

    @Override
    public void onCreate() {
        super.onCreate();
        context = getApplicationContext();
    }


}
