package com.example.chat_app.ContactsPage;

import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;

import com.example.chat_app.BaseActivity;

import com.example.chat_app.Model.Entities.Contact;
import com.example.chat_app.ViewModels.ChatsViewModel;
import com.example.chat_app.databinding.ActivityAddContactBinding;

public class AddContactActivity extends BaseActivity {

    private ActivityAddContactBinding binding;
    private Contact contact;
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
            if (contact == null) {
                String displayName = binding.etContent.getText().toString().trim();
                int profilePicId = getResources().getIdentifier("p1", "drawable", getPackageName());

                if (displayName.isEmpty()) {
                    binding.etContent.setError("Please enter a display name");
                    binding.etContent.requestFocus();
                    return;
                }
                // search the contact in the db by display name and add it to the contacts activity

            } else {
                ///////////////// do something here ///////////////////
            }

            finish();
        });
    }
}