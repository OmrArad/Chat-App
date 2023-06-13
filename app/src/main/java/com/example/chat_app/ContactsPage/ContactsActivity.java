package com.example.chat_app.ContactsPage;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.chat_app.AppDB;
import com.example.chat_app.LoginActivity;
import com.example.chat_app.R;
import com.example.chat_app.SettingsActivity;
import com.example.chat_app.databinding.ActivityContactsBinding;
import com.example.chat_app.databinding.ActivityRegisterBinding;

import java.util.ArrayList;
import java.util.List;

public class ContactsActivity extends AppCompatActivity {

    private ActivityContactsBinding binding;
    private ContactsAdapter contactAdapter;
    private List<Contact> contacts;

    private AppDB db;
    private ListView lvContacts;
    private List<String> contactLists;
    private ArrayAdapter<String> adapter;
    private ContactDao contactDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityContactsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.recyclerViewContacts.setLayoutManager(new LinearLayoutManager(this));

        // Create a list of contacts (sample data)
        contacts = new ArrayList<>();
        contacts.add(new Contact(R.drawable.p1, "John Doe", "hello", "12:30"));
        contacts.add(new Contact(R.drawable.p1, "Jane Smith", "goodbye", "yesterday 11:14"));
        // Add more contacts as needed

        // Create the adapter and attach it to the RecyclerView
        contactAdapter = new ContactsAdapter(this, contacts);
        binding.recyclerViewContacts.setAdapter(contactAdapter);

        binding.btnSettings.setOnClickListener(v -> {
            Intent i = new Intent(this, SettingsActivity.class);
            startActivity(i);
        });

        binding.fabAddContact.setOnClickListener(v -> {
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
//        loadContacts();
    }
}