package com.example.chat_app.Activities;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;

import com.example.chat_app.R;


public class BaseActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        boolean isDarkTheme = getSharedPreferences("MyPrefs", MODE_PRIVATE)
                .getBoolean("isDarkTheme", false);

        setTheme(isDarkTheme ? R.style.AppTheme_Dark : R.style.AppTheme_Light);

        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }

}
