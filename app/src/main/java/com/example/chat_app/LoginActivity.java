package com.example.chat_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.example.chat_app.ContactsPage.ContactsActivity;
import com.example.chat_app.databinding.ActivityLoginBinding;


public class LoginActivity extends AppCompatActivity {

    String server_url = "http://localhost:5001";


    private ActivityLoginBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityLoginBinding.inflate(getLayoutInflater());

//        setContentView(R.layout.activity_login);
        setContentView(binding.getRoot());

//        Button btnLogin = findViewById(R.id.btnLogin);
        binding.btnLogin.setOnClickListener(v -> {


            ////////////////////// validate here ////////////////////////

            Intent i = new Intent(this, ContactsActivity.class);
            startActivity(i);
        });

    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onRestart() {
        super.onRestart();
    }

    public void onSignUpClicked(View view) {
        Intent i = new Intent(this, RegisterActivity.class);
        startActivity(i);
    }
}