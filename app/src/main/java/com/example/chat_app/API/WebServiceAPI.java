package com.example.chat_app.API;

import com.example.chat_app.ContactsPage.Contact;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebServiceAPI {
    @GET("chats")
    Call<List<Contact>> getContacts();

    @POST("chats")
    Call<Void> addContact(@Body Contact contact);

    @DELETE("chats/{id}")
    Call<Void> deleteContact(@Path("id") int id);

    ////////// implement all API methods like the ones above ///////////

}
