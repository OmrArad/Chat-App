package com.example.chat_app.Repositories;

import android.app.Application;
import android.os.AsyncTask;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.chat_app.API.ChatAPI;
import com.example.chat_app.Model.AppDB;
import com.example.chat_app.ContactsPage.Contact;
import com.example.chat_app.ContactsPage.ContactDao;
import java.util.ArrayList;
import java.util.List;

public class ContactRepository {
    private ContactDao contactDao;
    private ContactListData contactListData;
    private ChatAPI api;

    public ContactRepository(Application application) {
        AppDB db = AppDB.getInstance(application);
        contactDao = db.contactDao();
        contactListData = new ContactListData();
        api = new ChatAPI(contactListData, contactDao);
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
    }

    public LiveData<List<Contact>> getAllContacts() {
        return contactListData;
    }

    public void insert(Contact contact) {
        // Perform the insert operation in the background thread
        AsyncTask.execute(() -> contactDao.insert(contact));
//        api.add(contact);
    }

    public void delete(Contact contact) {
        // Perform the insert operation in the background thread
        AsyncTask.execute(() -> contactDao.delete(contact));
    }

    public void reload() {
        api.getChatList();
    }
}

