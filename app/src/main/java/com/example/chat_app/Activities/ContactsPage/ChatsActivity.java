package com.example.chat_app.Activities.ContactsPage;

import androidx.appcompat.app.ActionBar;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.ImageButton;

import com.example.chat_app.Activities.ActiveChatActivity;
import com.example.chat_app.Adapters.ChatsAdapter;
import com.example.chat_app.Activities.BaseActivity;
//import com.example.chat_app.Dialogs.AddContactDialogFragment;
import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Activities.LoginActivity;
import com.example.chat_app.R;
import com.example.chat_app.SessionManager;
import com.example.chat_app.Activities.SettingsActivity;
import com.example.chat_app.ViewModels.ChatsViewModel;
import com.example.chat_app.databinding.ActivityChatsBinding;

public class ChatsActivity extends BaseActivity
        implements ChatsAdapter.OnContactClickListener{

    private ActivityChatsBinding binding;
    private ChatsViewModel chatsViewModel;
    private ChatsAdapter chatAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityChatsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Set up ViewModel and observe changes
        chatsViewModel = new ViewModelProvider(this).get(ChatsViewModel.class);

        // Create the adapter and attach it to the RecyclerView
        chatAdapter = new ChatsAdapter(getApplicationContext(), this);
        binding.recyclerViewChats.setAdapter(chatAdapter);
        binding.recyclerViewChats.setLayoutManager(new LinearLayoutManager(this));

        chatsViewModel.getAllChats().observe(this,
                chats -> chatAdapter.setChats(chats));

        chatAdapter.setOnContactClickListener(this);

        binding.fabAddContact.setOnClickListener(v -> {
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });

        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setHomeAsUpIndicator(R.drawable.ic_settings);
        actionBar.setDisplayShowHomeEnabled(true);
        actionBar.setDisplayShowTitleEnabled(false);
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setCustomView(R.layout.action_bar_logout);
        ImageButton btnLogout = actionBar.getCustomView().findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(v -> {
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
            recreate(); // Recreate the activity after logging out
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_bar_logout) {
            // logout current user
            SessionManager.logout();

            // return to login activity
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
            recreate(); // Recreate the activity after logging out
            return true;
        } else if (item.getItemId() == android.R.id.home) {
            Intent intent = new Intent(this, SettingsActivity.class);
            startActivity(intent);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onContactClick(Chat chat) {
        Intent intent = new Intent(this, ActiveChatActivity.class);
        intent.putExtra("chat", chat);
        startActivity(intent);
    }

    @Override
    public void onContactLongClick(Chat chat) {
        try {
            chatsViewModel.delete(chat);
        } catch (Exception e) {
            Log.e(this.getClass().getSimpleName(), e.getMessage());
        }
        chatsViewModel.reload();
    }
}
