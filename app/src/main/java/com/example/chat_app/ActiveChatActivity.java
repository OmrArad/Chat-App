package com.example.chat_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.chat_app.Model.Entities.Contact;

public class ActiveChatActivity extends AppCompatActivity {

    private ImageView profilePic;
    private TextView displayName;

    ///// add message list /////

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
            Contact contact = (Contact) intent.getSerializableExtra("contact");

            if (contact != null) {
                // Display the contact details on the screen
                profilePic.setImageResource(contact.getProfilePic());
                displayName.setText(contact.getDisplayName());
            }
        }
    }
}