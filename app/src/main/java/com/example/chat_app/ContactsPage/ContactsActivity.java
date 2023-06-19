package com.example.chat_app.ContactsPage;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.room.Room;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.chat_app.ActiveChatActivity;
import com.example.chat_app.Adapters.ContactsAdapter;
import com.example.chat_app.AppDB;
import com.example.chat_app.Dialogs.AddContactDialogFragment;
import com.example.chat_app.Repositories.ContactRepository;
import com.example.chat_app.SettingsActivity;
import com.example.chat_app.ViewModels.ContactsViewModel;
import com.example.chat_app.databinding.ActivityContactsBinding;
import com.example.chat_app.databinding.FragmentAddContactBinding;

import java.util.List;

public class ContactsActivity extends AppCompatActivity
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
        binding.btnSettings.setOnClickListener(v -> {
            Intent i = new Intent(this, SettingsActivity.class);
            startActivity(i);
        });
        binding.fabAddContact.setOnClickListener(v -> {
//            showNoticeDialog();
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });

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