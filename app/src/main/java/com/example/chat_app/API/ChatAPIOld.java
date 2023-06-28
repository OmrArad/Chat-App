package com.example.chat_app.API;

import androidx.lifecycle.MutableLiveData;

import com.example.chat_app.API.Auth.AuthUtil;
import com.example.chat_app.API.Entities.ApiMessage;
import com.example.chat_app.API.Entities.ChatResponse;
import com.example.chat_app.Model.Entities.Contact;
import com.example.chat_app.Model.DAOs.ContactDao;
import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.MyApplication;
import com.example.chat_app.R;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ChatAPIOld {
    private MutableLiveData<List<Contact>> contactListData;
    private ContactDao dao;
    private Retrofit retrofit;
    private WebServiceAPI webServiceAPI;

    public ChatAPIOld(MutableLiveData<List<Contact>> contactListData, ContactDao dao) {
        this.contactListData = contactListData;
        this.dao = dao;

        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .client(AuthUtil.createOkHttpClient())
                .build();

        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void getChatList() {
        Call<List<Contact>> call = webServiceAPI.getContacts();
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(Call<List<Contact>> call, Response<List<Contact>> response) {
                new Thread(() -> {
                    contactListData.postValue(response.body());
                }).start();
            }

            @Override
            public void onFailure(Call<List<Contact>> call, Throwable t) {
                // Handle failure
            }
        });
    }

    public void addContact(Contact newContact) {
        Call<Void> call = webServiceAPI.addContact(newContact);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    // TODO: Contact added successfully, handle accordingly
                } else {
                    // TODO: Handle unsuccessful response
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                // TODO: Handle network failure
            }
        });

    }

    public void deleteContact(Contact contact) {
        Call<Void> call = webServiceAPI.deleteContact(contact.getId());
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    // TODO: Contact deleted successfully, handle accordingly
                } else {
                    // TODO: Handle unsuccessful response
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                // TODO: Handle network failure
            }
        });
    }

    private List<Message> responseToMessageList(ChatResponse response) {
        int chatId = response.getId();
        List<Message> newMessageList = new ArrayList<>();

        List<ApiMessage> responseMsgs = response.getMessages();

        for (ApiMessage msg : responseMsgs) {
            newMessageList.add(new Message(msg.getId(), chatId, msg.getCreated(), msg.getContent(),
                    msg.getSender()));
        }
        return newMessageList;
    }

    public void getChatById(int id) {
        // Issue the network request
        Call<ChatResponse> call = webServiceAPI.getChatById(id);

        // Enqueue the request
        call.enqueue(new Callback<ChatResponse>() {
            @Override
            public void onResponse(Call<ChatResponse> call, Response<ChatResponse> response) {
                if (response.isSuccessful()) {
                    ChatResponse chatResponse = response.body();
                    if (chatResponse != null) {
                        List<Message> messages = responseToMessageList(chatResponse);
                        // add messages to database
                    }
                } else {
                    // TODO: Handle unsuccessful response
                }
            }

            @Override
            public void onFailure(Call<ChatResponse> call, Throwable t) {
                // TODO: Handle network failure
            }
        });

    }
}

