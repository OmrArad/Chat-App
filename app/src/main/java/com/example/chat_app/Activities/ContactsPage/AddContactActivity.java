package com.example.chat_app.Activities.ContactsPage;

import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;

import com.example.chat_app.Activities.BaseActivity;

import com.example.chat_app.ViewModels.ChatsViewModel;
import com.example.chat_app.databinding.ActivityAddContactBinding;

public class AddContactActivity extends BaseActivity {

    private ActivityAddContactBinding binding;
    private ChatsViewModel chatsViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityAddContactBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        chatsViewModel = new ViewModelProvider(this).get(ChatsViewModel.class);

        handleSave();
    }

    private void handleSave() {
        binding.btnAdd.setOnClickListener(view -> {
            String username = binding.etContent.getText().toString().trim();

            if (username.isEmpty()) {
                binding.etContent.setError("Please enter a username");
                binding.etContent.requestFocus();
                return;
            }
            chatsViewModel.addContact(username);

            finish();
        });
    }
}