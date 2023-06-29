package com.example.chat_app.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import com.example.chat_app.API.Entities.UserPass;
import com.example.chat_app.API.LoginAPI;
import com.example.chat_app.Activities.ContactsPage.ChatsActivity;
import com.example.chat_app.R;
import com.example.chat_app.databinding.ActivityLoginBinding;

public class LoginActivity extends BaseActivity {

    private static LoginAPI loginAPI = new LoginAPI();

    private ActivityLoginBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.btnLogin.setOnClickListener(v -> {
            if(validateForm()) {
                EditText etUsername = findViewById(R.id.etUsername);
                EditText etPassword = findViewById(R.id.etPassword);

                String username = etUsername.getText().toString().trim();
                String password = etPassword.getText().toString().trim();

                UserPass loginDetails = new UserPass(username, password);

                // authenticate user with api method, then save user details for session
                try {
                    loginAPI.authenticate(loginDetails);
                    loginAPI.getUserDetails(username);
                    Intent i = new Intent(this, ChatsActivity.class);
                    startActivity(i);
                } catch (Exception e) {
                    Log.e("LoginActivity", e.getMessage());
                }
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

    public void onSignUpClicked(View view) {
        Intent i = new Intent(this, RegisterActivity.class);
        startActivity(i);
    }


}