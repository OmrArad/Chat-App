package com.example.chat_app.Activities;


import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.chat_app.Activities.ContactsPage.ChatsActivity;
import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.UserDetails;
import com.example.chat_app.R;

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
            Chat chat = (Chat) intent.getSerializableExtra("chat");

            if (chat != null) {
                UserDetails contact = chat.getContact();
                // Display the contact details on the screen
                profilePic.setImageResource(getResources().getIdentifier(
                        contact.getProfilePic(), "drawable", getPackageName()));
                displayName.setText(contact.getDisplayName());
            } else {
                // go back to chats page in case of null chat
                Log.e(this.getClass().getSimpleName(), "error: null chat object");
                startActivity(new Intent(this, ChatsActivity.class));
            }
        } else {
            // go back to chats page in case of null intent
            Log.e(this.getClass().getSimpleName(), "error: null intent");
            startActivity(new Intent(this, ChatsActivity.class));
        }
    }
}