package com.example.chat_app.API;

import android.util.Log;

import com.example.chat_app.API.Auth.AuthUtil;
import com.example.chat_app.API.Auth.TokenManager;
import com.example.chat_app.Model.Entities.UserDetails;
import com.example.chat_app.API.Entities.UserPass;
import com.example.chat_app.MyApplication;
import com.example.chat_app.R;
import com.example.chat_app.SessionManager;
import com.example.chat_app.Settings.GlobalVariables;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginAPI {
    private TokenManager tokenManager;

    private Retrofit retrofit;

    private WebServiceAPI webServiceAPI;


    public LoginAPI() {

        tokenManager = TokenManager.getInstance();

        retrofit = new Retrofit.Builder()
                .baseUrl(GlobalVariables.getServerBaseUrl(MyApplication.context))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        webServiceAPI = retrofit.create(WebServiceAPI.class);

    }

    public void authenticate(UserPass loginDetails) {
        // Make the API call to log in the user
        Call<String> call = webServiceAPI.authenticate(loginDetails);
        try {
            call.enqueue(new Callback<String>() {
                @Override
                public void onResponse(Call<String> call, Response<String> response) {
                    if (response.isSuccessful()) {
                        String token = response.body();
                        tokenManager.setToken(token);
                        // rebuild retrofit object using authorization interceptor
                        retrofit = new Retrofit.Builder()
                                .baseUrl(GlobalVariables.getServerBaseUrl(MyApplication.context))
                                .addConverterFactory(GsonConverterFactory.create())
                                .client(AuthUtil.createOkHttpClient())
                                .build();
                    } else {
                        // You can extract the error message from the response if available
                        String errorMessage = response.message();
                        throw new RuntimeException("authentication error: " + errorMessage);
                    }
                }

                @Override
                public void onFailure(Call<String> call, Throwable t) {
                    throw new RuntimeException("authentication failure: " + t.getMessage());
                }
            });
        } catch (Exception e) {
            Log.e("LoginAPI", e.getMessage());
        }

    }

    public void getUserDetails(String username) {
        // Create a request to get the user details
        Call<UserDetails> call = webServiceAPI.getUserDetails(username);
        call.enqueue(new Callback<UserDetails>() {
            @Override
            public void onResponse(Call<UserDetails> call, Response<UserDetails> response) {
                if (response.isSuccessful()) {
                    // Handle successful response
                    UserDetails userDetails = response.body();
                    SessionManager.setCurrentUser(userDetails);

                } else {
                    // TODO: Handle unsuccessful response
                    // Extract the error message from the response if available
                    String errorMessage = response.message();
                    // Log the error message
                    throw new RuntimeException("login unsuccessful: " + errorMessage);
                }
            }

            @Override
            public void onFailure(Call<UserDetails> call, Throwable t) {
                throw new RuntimeException("login error: " + t.getMessage());
            }
        });
    }

}