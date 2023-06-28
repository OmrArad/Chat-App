package com.example.chat_app.API;

import android.os.Build;

import androidx.annotation.RequiresApi;

import com.example.chat_app.API.Auth.AuthUtil;
import com.example.chat_app.API.Entities.ApiMessage;
import com.example.chat_app.API.Entities.ChatResponse;
import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.Model.Repositories.ChatRepository;
import com.example.chat_app.Model.Repositories.MessageRepository;
import com.example.chat_app.MyApplication;
import com.example.chat_app.R;
import com.example.chat_app.Settings.GlobalVariables;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ChatAPI {

    private Retrofit retrofit;

    private WebServiceAPI webServiceAPI;

    private ChatRepository chatRepository;

    private MessageRepository messageRepository;

    public ChatAPI(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;

        retrofit = new Retrofit.Builder()
                .baseUrl(GlobalVariables.getServerBaseUrl(MyApplication.context))
                .addConverterFactory(GsonConverterFactory.create())
                .client(AuthUtil.createOkHttpClient())
                .build();

        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void getAllChats() {
        // Create a request to get chats
        Call<List<Chat>> call = webServiceAPI.getChats();

        // Enqueue the request
        call.enqueue(new Callback<List<Chat>>() {
            @Override
            public void onResponse(Call<List<Chat>> call, Response<List<Chat>> response) {
                if (response.isSuccessful()) {
                    // Handle successful response
                    List<Chat> chats = response.body();
                    chatRepository.insertChats(chats);
                } else {
                    //TODO: Handle failure response
                    // You can access the error message using response.errorBody()
                }
            }

            @Override
            public void onFailure(Call<List<Chat>> call, Throwable t) {
                // Handle failure in making the request or network issues
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

    // possibly unnecessary function - getChatMessages is better
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
                        messageRepository.insertMessages(messages);
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

    public void getChatMessages(int chatId) {
        Call<List<ApiMessage>> call = webServiceAPI.getChatMessages(chatId);
        // Enqueue the request
        call.enqueue(new Callback<List<ApiMessage>>() {
            @RequiresApi(api = Build.VERSION_CODES.O)
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

    public void deleteChatById(int id) {
        Call<Void> call = webServiceAPI.deleteChatById(id);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    // Handle successful deletion
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

    public void addMessageToChat(Message newMessage) {
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
