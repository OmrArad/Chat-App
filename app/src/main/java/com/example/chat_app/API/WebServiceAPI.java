package com.example.chat_app.API;

import com.example.chat_app.API.Entities.ApiMessage;
import com.example.chat_app.API.Entities.ChatResponse;
import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.UserDetails;
import com.example.chat_app.API.Entities.UserNamePass;
import com.example.chat_app.API.Entities.UserPass;
import com.example.chat_app.Model.Entities.Contact;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebServiceAPI {

//    @GET("Chats")
    Call<List<Contact>> getContacts();

    @GET("Chats")
    Call<List<Chat>> getChats();

    @POST("Chats")
    Call<Void> addContact(@Body Contact contact);

//    @POST("Chats")
//    Call<Void> addChat(@Body Chat chat);

    @GET("Chats/{id}")
    Call<ChatResponse> getChatById(@Path("id") int id);

    @GET("Chats/{id}/Messages")
    Call<List<ApiMessage>> getChatMessages(@Path("id") int id);

    @DELETE("Chats/{id}")
    Call<Void> deleteContact(@Path("id") int id);

    //@DELETE("Chats/{id}")
    Call<Void> deleteChatById(@Path("id") int id);

    @POST("Chats/{id}/Messages")
    Call<Void> addMessageToChat(@Path("id") int id, ApiMessage message);

    @POST("Tokens")
    Call<String> authenticate(UserPass userPass);

    @GET("Users/{username}")
    Call<UserDetails> getUserDetails(@Path("username") String username);

    @POST("Users")
    Call<UserDetails> register(@Body UserNamePass formData);

    ////////// implement all API methods like the ones above ///////////


}
