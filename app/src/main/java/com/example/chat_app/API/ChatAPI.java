package com.example.chat_app.API;

import android.app.Application;

import androidx.lifecycle.MutableLiveData;

import com.example.chat_app.API.Auth.AuthUtil;
import com.example.chat_app.ContactsPage.Contact;
import com.example.chat_app.ContactsPage.ContactDao;
import com.example.chat_app.MyApplication;
import com.example.chat_app.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ChatAPI {
    private MutableLiveData<List<Contact>> contactListData;
    private ContactDao dao;
    private Retrofit retrofit;
    private WebServiceAPI webServiceAPI;

    public ChatAPI(MutableLiveData<List<Contact>> contactListData, ContactDao dao) {
        this.contactListData = contactListData;
        this.dao = dao;

        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .client(AuthUtil.createOkHttpClient())
                .build();

        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void get() {
        Call<List<Contact>> call = webServiceAPI.getContacts();
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(Call<List<Contact>> call, Response<List<Contact>> response) {
                new Thread(() -> {
//                    dao.clear();
//                    dao.insertList(response.body());
                    contactListData.postValue(response.body());
                }).start();
            }

            @Override
            public void onFailure(Call<List<Contact>> call, Throwable t) {
                // Handle failure
            }
        });
    }
}

