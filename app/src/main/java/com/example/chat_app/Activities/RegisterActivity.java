package com.example.chat_app.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import com.example.chat_app.API.Entities.UserNamePass;
import com.example.chat_app.API.RegisterAPI;
import com.example.chat_app.databinding.ActivityRegisterBinding;


public class RegisterActivity extends BaseActivity {

    private ActivityRegisterBinding binding;

    private static RegisterAPI registerAPI = new RegisterAPI();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityRegisterBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());


        binding.btnRegister.setOnClickListener(v -> {
            // Perform validation here
            if (validateForm()) {
                String username = binding.etUsername.getText().toString().trim();
                String password = binding.etPassword.getText().toString().trim();
                String displayName = binding.etDisplayName.getText().toString().trim();
                String picture = binding.imageViewProfile.toString().trim();

                // Create a new user object
                UserNamePass newUser = new UserNamePass(username, password, displayName, picture);

                // Call the API
                try {
                    registerAPI.register(newUser);
                } catch (Exception e) {
                    // log the error
                    Log.e("RegisterActivity", e.getMessage());
                    // TODO: display error to user
                }
                // TODO: Handle the response
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


        return !hasError;
    }

    public void onLoginClicked(View view) {
        Intent i = new Intent(this, LoginActivity.class);
        startActivity(i);
    }
}