package com.example.chat_app.API;

import com.example.chat_app.API.Entities.UserDetails;
import com.example.chat_app.API.Entities.UserNamePass;
import com.example.chat_app.API.Entities.UserPass;
import com.example.chat_app.ContactsPage.Contact;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebServiceAPI {

    @GET("Chats")
    Call<List<Contact>> getContacts();

    @POST("Chats")
    Call<Void> addContact(@Body Contact contact);

    @DELETE("Chats/{id}")
    Call<Void> deleteContact(@Path("id") int id);

    @POST("Tokens")
    Call<String> authenticate(UserPass userPass);

    @GET("Users/{username}")
    Call<UserDetails> getUserDetails(@Path("username") String username);

    @POST("Users")
    Call<UserDetails> register(UserNamePass formData);

    ////////// implement all API methods like the ones above ///////////


}
