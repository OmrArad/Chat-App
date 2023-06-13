package com.example.chat_app.ContactsPage;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.os.Bundle;

import com.example.chat_app.AppDB;
import com.example.chat_app.R;
import com.example.chat_app.databinding.ActivityAddContactBinding;

public class AddContactActivity extends AppCompatActivity {

    private AppDB db;
    private ActivityAddContactBinding binding;
    private Contact contact;
    private ContactDao contactDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityAddContactBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "AppDB")
                .allowMainThreadQueries()
                .build();
        contactDao = db.contactDao();

        handleSave();

        if (getIntent().getExtras() != null) {

            ///////////// add contact to screen //////////////

            int id = getIntent().getExtras().getInt("id");
            contact = contactDao.get(id);

            binding.etContent.setText(contact.getDisplayName());
        }
    }

    private void handleSave() {
        binding.btnSave.setOnClickListener(view -> {
            if (contact == null) {
                String displayName = binding.etContent.getText().toString();
                int profilePicId = getResources().getIdentifier("p1", "drawable", getPackageName());
                contact = new Contact(profilePicId, displayName, "goodbye", "yesterday 11:14");
                contactDao.insert(contact);
            } else {

                ///////////////// do something here ///////////////////

//                contact.setSomething(binding.etContent.getText().toString());
//                contactDao.update(contact);
            }

            finish();
        });
    }
}