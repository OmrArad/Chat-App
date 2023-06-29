package com.example.chat_app.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;

import androidx.appcompat.app.ActionBar;

import com.example.chat_app.API.Entities.UserPass;
import com.example.chat_app.API.LoginAPI;
import com.example.chat_app.Activities.ContactsPage.ChatsActivity;
import com.example.chat_app.Model.Entities.UserDetails;
import com.example.chat_app.R;
import com.example.chat_app.databinding.ActivityLoginBinding;

public class LoginActivity extends BaseActivity {
    private static final int SETTINGS_REQUEST_CODE = 1;
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
                    // TODO: pass UserDetails as extra
//                    i.putExtra("userDetails", UserDetails);
                    startActivity(i);
                } catch (Exception e) {
                    Log.e("LoginActivity", e.getMessage());
                }
            }
        });
        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setHomeAsUpIndicator(R.drawable.ic_settings);
        actionBar.setDisplayShowHomeEnabled(true);
        actionBar.setDisplayShowTitleEnabled(false);
        actionBar.setDisplayShowCustomEnabled(true);

    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_bar_logout) {
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
            recreate(); // Recreate the activity after logging out
            return true;
        } else if (item.getItemId() == android.R.id.home) {
            Intent intent = new Intent(this, SettingsActivityPreLogin.class);
            startActivityForResult(intent, SETTINGS_REQUEST_CODE);
            return true;
        }
        return super.onOptionsItemSelected(item);
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
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == SETTINGS_REQUEST_CODE && resultCode == RESULT_OK) {
            boolean themeChanged = data.getBooleanExtra("themeChanged", false);
            if (themeChanged) {
                recreate(); // Recreate the activity to apply the theme change
            }
        }
    }

}