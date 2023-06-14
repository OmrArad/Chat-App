package com.example.chat_app.Repositories;

import android.app.Application;
import android.os.AsyncTask;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import com.example.chat_app.AppDB;
import com.example.chat_app.ContactsPage.Contact;
import com.example.chat_app.ContactsPage.ContactDao;
import java.util.ArrayList;
import java.util.List;

public class ContactRepository {
    private ContactDao contactDao;
    private ContactListData contactListData;

    public ContactRepository(Application application) {
        AppDB db = AppDB.getInstance(application);
        contactDao = db.contactDao();
        contactListData = new ContactListData();
    }

    private class ContactListData extends MutableLiveData<List<Contact>> {
        public ContactListData() {
            super();
            setValue(new ArrayList<>());
        }

        @Override
        protected void onActive() {
            super.onActive();

            new Thread(() -> {
                contactListData.postValue(contactDao.index());
            }).start();
        }

        public void insert(Contact contact) {
            List<Contact> contacts = getValue();
            assert contacts != null;
            contacts.add(contact);
            postValue(contacts);
        }
    }

    public LiveData<List<Contact>> getAllContacts() {
        return contactListData;
    }

    public void insert(Contact contact) {
        // Perform the insert operation in the background thread
        AsyncTask.execute(() -> contactDao.insert(contact));
    }
}


