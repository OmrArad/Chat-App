package com.example.chat_app.ViewModels;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.chat_app.ContactsPage.Contact;
import com.example.chat_app.Repositories.ContactRepository;

import java.util.List;

public class ContactsViewModel extends AndroidViewModel {

    private ContactRepository contactRepository;
    private LiveData<List<Contact>> allContactsLiveData;

    public ContactsViewModel(@NonNull Application application) {
        super(application);
        contactRepository = new ContactRepository(application);
        allContactsLiveData = contactRepository.getAllContacts();
    }

    public LiveData<List<Contact>> getAllContacts() {
        return allContactsLiveData;
    }

    public void insert(Contact contact) {
        contactRepository.insert(contact);
    }
//
//    public void delete(Contact contact) {
//        contactRepository.delete(contact);
//    }
//
//    public void reload(Contact contact) {
//        contactRepository.reload(contact);
//    }
}
