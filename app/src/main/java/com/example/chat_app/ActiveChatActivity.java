package com.example.chat_app;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.Contact;
import com.example.chat_app.Model.Entities.UserDetails;

public class ActiveChatActivity extends AppCompatActivity {

    private ImageView profilePic;
    private TextView displayName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_active_chat);

        // Initialize views
        profilePic = findViewById(R.id.ivProfile);
        displayName = findViewById(R.id.tvDisplayName);

        // Get the selected contact from the intent
        Intent intent = getIntent();
        if (intent != null) {
            Chat chat = (Chat) intent.getSerializableExtra("contact");

            if (chat != null) {
                UserDetails contact = chat.getContact();
                // Display the contact details on the screen
                profilePic.setImageResource(getResources().getIdentifier(
                        contact.getProfilePic(), "drawable", getPackageName()));
                displayName.setText(contact.getDisplayName());
            }
        }
    }
}