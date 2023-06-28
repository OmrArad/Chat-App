package com.example.chat_app.ContactsPage;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import com.example.chat_app.LoginActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.ImageButton;

import androidx.appcompat.widget.Toolbar;


import com.example.chat_app.ActiveChatActivity;
import com.example.chat_app.Adapters.ContactsAdapter;

import com.example.chat_app.BaseActivity;
import com.example.chat_app.Dialogs.AddContactDialogFragment;
import com.example.chat_app.R;
import com.example.chat_app.SettingsActivity;
import com.example.chat_app.ViewModels.ContactsViewModel;
import com.example.chat_app.databinding.ActivityContactsBinding;

public class ContactsActivity extends BaseActivity
        implements ContactsAdapter.OnContactClickListener,
        AddContactDialogFragment.AddContactDialogListener {

    private ActivityContactsBinding binding;
    private ContactsViewModel contactsViewModel;
    private ContactsAdapter contactAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityContactsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Set up ViewModel and observe changes
        contactsViewModel = new ViewModelProvider(this).get(ContactsViewModel.class);

        // Create the adapter and attach it to the RecyclerView
        contactAdapter = new ContactsAdapter(this);
        binding.recyclerViewContacts.setAdapter(contactAdapter);
        binding.recyclerViewContacts.setLayoutManager(new LinearLayoutManager(this));

        contactsViewModel.getAllContacts().observe(this,
                contacts -> contactAdapter.setContacts(contacts));

        contactAdapter.setOnContactClickListener(this);
//        ImageButton btnLogout = findViewById(R.id.btnLogout);
//        btnLogout.setOnClickListener(v -> {
//            // Perform the desired action, such as logging out and starting the LoginActivity
//            Intent intent = new Intent(this, LoginActivity.class);
//            startActivity(intent);
//        });


        binding.fabAddContact.setOnClickListener(v -> {
//            showNoticeDialog();
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });

        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setHomeAsUpIndicator(R.drawable.ic_settings);
        actionBar.setDisplayShowHomeEnabled(true);
        // show logout button
        actionBar.setDisplayShowTitleEnabled(false);
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setCustomView(R.layout.action_bar_logout);
        ImageButton btnLogout = actionBar.getCustomView().findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(v -> {
            // Perform the desired action, such as logging out and starting the LoginActivity
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_bar_logout) {
            // Handle the logout button click
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
            return true;
        } else if (item.getItemId() == android.R.id.home) {
            // Handle the up button click, which is equivalent to the settings button
            Intent intent = new Intent(this, SettingsActivity.class);
            startActivity(intent);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }



    @Override
    public void onContactClick(Contact contact) {
        Intent intent = new Intent(this, ActiveChatActivity.class);
        intent.putExtra("contact", contact);
        startActivity(intent);
    }

    @Override
    public void onContactLongClick(Contact contact) {
        contactsViewModel.delete(contact);
        contactsViewModel.reload();
    }

    public void showNoticeDialog() {
        // Create an instance of the dialog fragment and show it
        DialogFragment dialog = new AddContactDialogFragment();
        dialog.show(getSupportFragmentManager(), "AddContactDialogFragment");
    }

    @Override
    public void onDialogPositiveClick(DialogFragment dialog) {

    }

    @Override
    public void onDialogNegativeClick(DialogFragment dialog) {

    }
}