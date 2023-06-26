package com.example.chat_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import com.example.chat_app.ContactsPage.ContactsActivity;
import com.example.chat_app.databinding.ActivityLoginBinding;

public class LoginActivity extends BaseActivity {

    private ActivityLoginBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

//        Button btnLogin = findViewById(R.id.btnLogin);
        binding.btnLogin.setOnClickListener(v -> {

            ////////////////////// validate here ////////////////////////
            if(validateForm()) {
                Intent i = new Intent(this, ContactsActivity.class);
                startActivity(i);
            }
        });

    }
    private boolean validateForm() {
        EditText etUsername = findViewById(R.id.etUsername);
        EditText etPassword = findViewById(R.id.etPassword);

        String username = etUsername.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        boolean hasError = false;

        // Validate username
        if (username.isEmpty()) {
            etUsername.setError("Username required");
            etUsername.requestFocus();
            hasError = true;
        }

        // Validate password
        if (password.isEmpty()) {
            etPassword.setError("Password required");
            etPassword.requestFocus();
            hasError = true;
        }

        return !hasError;
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