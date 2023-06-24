package com.example.chat_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import com.example.chat_app.databinding.ActivityLoginBinding;
import com.example.chat_app.databinding.ActivityRegisterBinding;


public class RegisterActivity extends AppCompatActivity {

    private ActivityRegisterBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityRegisterBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

        binding.btnRegister.setOnClickListener(v -> {
            // Perform validation here
            if (validateForm()) {
                // Validation passed, proceed with registration logic
                Intent i = new Intent(this, LoginActivity.class);
                startActivity(i);
            }
        });
    }

    private boolean validateForm() {
        EditText etUsername = binding.etUsername;
        EditText etPassword = binding.etPassword;
        EditText etVerifyPassword = binding.etVerifyPassword;
        EditText etDisplayName = binding.etDisplayName;

        String username = etUsername.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String verifyPassword = etVerifyPassword.getText().toString().trim();
        String displayName = etDisplayName.getText().toString().trim();

        boolean hasError = false;

        // Validate username
        if (username.isEmpty()) {
            etUsername.setError("Username required");
            etUsername.requestFocus();
            hasError = true;
        } else if (username.length() < 5) {
            etUsername.setError("Name must contain at least 5 characters");
            etUsername.requestFocus();
            hasError = true;
        } // User-Already-Exists case is handled in handleRegistration

        // Validate password
        if (password.isEmpty()) {
            etPassword.setError("Password required");
            etPassword.requestFocus();
            hasError = true;
        } else if (password.length() < 8) {
            etPassword.setError("Password must contain 8 characters");
            etPassword.requestFocus();
            hasError = true;
        }

        // Verify password
        if (verifyPassword.isEmpty()) {
            etVerifyPassword.setError("Please verify password");
            etVerifyPassword.requestFocus();
            hasError = true;
        } else if (!password.equals(verifyPassword)) {
            etVerifyPassword.setError("Given passwords do not match");
            etVerifyPassword.requestFocus();
            hasError = true;
        }

        // Validate display name
        if (displayName.isEmpty()) {
            etDisplayName.setError("Display name required");
            etDisplayName.requestFocus();
            hasError = true;
        }

        // Validate picture
        // Assuming the picture field is not implemented in the code provided
        // Adjust the validation logic accordingly if the picture field is present

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

    public void onLoginClicked(View view) {
        Intent i = new Intent(this, LoginActivity.class);
        startActivity(i);
    }
}