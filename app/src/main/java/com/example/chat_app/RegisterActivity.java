package com.example.chat_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.telecom.Call;
import android.view.View;
import android.widget.EditText;

import com.example.chat_app.Model.Entities.UserDetails;
import com.example.chat_app.API.Entities.UserNamePass;
import com.example.chat_app.API.RegisterAPI;
import com.example.chat_app.databinding.ActivityRegisterBinding;


public class RegisterActivity extends BaseActivity {

    private ActivityRegisterBinding binding;

    private RegisterAPI registerAPI;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerAPI = new RegisterAPI();
        binding = ActivityRegisterBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.btnRegister.setOnClickListener(v -> {
            // Perform validation here
            if (validateForm()) {
                // use the API to register the user
                String username = binding.etUsername.getText().toString().trim();
                String password = binding.etPassword.getText().toString().trim();
                String displayName = binding.etDisplayName.getText().toString().trim();
                String picture = binding.imageViewProfile.toString().trim();
                registerAPI.register(new UserNamePass(username, password, displayName, picture));
                // Go to login page
                Intent i = new Intent(this, LoginActivity.class);
                startActivity(i);
            }
        });
    }

    private boolean validateForm() {
        EditText etUsername = binding.etUsername;
        EditText etPassword = binding.etPassword;
        EditText etDisplayName = binding.etDisplayName;

        // Validate the fields (you can add more validation rules if needed)
        if (etUsername.getText().toString().isEmpty()) {
            etUsername.setError("Please enter a username");
            return false;
        }

        if (etPassword.getText().toString().isEmpty()) {
            etPassword.setError("Please enter a password");
            return false;
        }

        if (etDisplayName.getText().toString().isEmpty()) {
            etDisplayName.setError("Please enter a display name");
            return false;
        }

        return true;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        binding = null;
    }
}
