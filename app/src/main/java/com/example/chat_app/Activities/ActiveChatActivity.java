package com.example.chat_app.Activities;


import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chat_app.Activities.ContactsPage.ChatsActivity;
import com.example.chat_app.Adapters.MessageAdapter;
import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.Model.Entities.UserDetails;
import com.example.chat_app.R;
import com.example.chat_app.ViewModels.MessageViewModel;
import com.example.chat_app.databinding.ActivityActiveChatBinding;

import java.util.List;

public class ActiveChatActivity extends AppCompatActivity {

    private ImageView profilePic;
    private TextView displayName;

    private ActivityActiveChatBinding binding;

    private MessageViewModel messageViewModel;

    private MessageAdapter messageAdapter;

    private RecyclerView recyclerViewMessages;

    private List<Message> messageList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityActiveChatBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Set up ViewModel and observe changes
        messageViewModel = new ViewModelProvider(this).get(MessageViewModel.class);

        // Create the adapter and attach it to the RecyclerView
        messageAdapter = new MessageAdapter(messageList);
        binding.messagesRecyclerView.setAdapter(messageAdapter);
        binding.messagesRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        messageViewModel.getAllMessages().observe(this,
                messages -> messageAdapter.setMessages(messages));

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

        // Set up click listener for the send button
        ImageButton sendButton = findViewById(R.id.btnSend);
        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Retrieve the message text from the EditText
                EditText messageEditText = findViewById(R.id.etMessage);
                String messageText = messageEditText.getText().toString().trim();

                // Check if the message text is not empty
                if (!messageText.isEmpty()) {
                    sendMessageToRecipient(messageText);

                    // Update the UI to display the sent message
                    updateChatViewWithSentMessage(messageText);

                    // Clear the input field after sending the message
                    messageEditText.setText("");
                }
            }
        });
    }

    // Helper method to create a list of messages (example)
//    private List<Message> createMessageList() {
//        // optional TODO: Implement your logic to retrieve the list of messages
//        // For now, let's create a dummy list for testing
//        List<Message> messages = new ArrayList<>();
//        messages.add(new Message("Hello!", "12:30 PM"));
//        messages.add(new Message("How are you?", "12:35 PM"));
//        messages.add(new Message("I'm good, thanks!", "12:40 PM"));
//        //...
//        return messages;
//    }

    private void sendMessageToRecipient(String message) {
        // TODO
        // Perform actions to send the message to the recipient
        // For example, make a network request or update the database
        // Implement your specific logic here
    }

    private void updateChatViewWithSentMessage(String message) {
        // TODO
        // Update the UI to display the sent message
        // For example, append the message to a RecyclerView or update a TextView
        // Implement your specific logic here
    }


}