package com.example.chat_app.API;

import com.example.chat_app.API.Auth.AuthUtil;
import com.example.chat_app.API.Entities.ApiMessage;
import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.Model.Repositories.MessageRepository;
import com.example.chat_app.MyApplication;
import com.example.chat_app.R;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MessageAPI {
    private Retrofit retrofit;

    private WebServiceAPI webServiceAPI;

    private MessageRepository messageRepository;

    public MessageAPI(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;

        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .client(AuthUtil.createOkHttpClient())
                .build();

        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void getChatMessages(int chatId) {
        Call<List<ApiMessage>> call = webServiceAPI.getChatMessages(chatId);
        // Enqueue the request
        call.enqueue(new Callback<List<ApiMessage>>() {
            @Override
            public void onResponse(Call<List<ApiMessage>> call, Response<List<ApiMessage>> response) {
                if (response.isSuccessful()) {
                    List<ApiMessage> apiMessages = response.body();
                    if (apiMessages != null) {
                        // convert list of API messages to database messages
                        List<Message> messages = new ArrayList<>();
                        for (ApiMessage apiMsg : apiMessages) {
                            messages.add(new Message(chatId, apiMsg));
                        }

                        // add new list to repository
                        messageRepository.insertMessages(messages);
                    }
                } else {
                    // TODO: Handle unsuccessful response
                }
            }

            @Override
            public void onFailure(Call<List<ApiMessage>> call, Throwable t) {
                // TODO: Handle network failure
            }
        });
    }

    public void sendMessage(Message newMessage) {
        Call<Void> call = webServiceAPI.addMessageToChat(newMessage.getId(), new ApiMessage(newMessage));

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    // Handle successful insertion
                } else {
                    // Handle unsuccessful response
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                // Handle network failure
            }
        });
    }
}
