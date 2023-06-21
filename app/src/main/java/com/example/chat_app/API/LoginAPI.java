package com.example.chat_app.API;

import com.example.chat_app.API.Auth.AuthUtil;
import com.example.chat_app.API.Auth.TokenManager;
import com.example.chat_app.API.Entities.UserDetails;
import com.example.chat_app.API.Entities.UserPass;
import com.example.chat_app.MyApplication;
import com.example.chat_app.R;

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
                .baseUrl(MyApplication.context.getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        webServiceAPI = retrofit.create(WebServiceAPI.class);

    }

    public void authenticate(UserPass loginDetails) {
        // Make the API call to log in the user
        Call<String> call = webServiceAPI.authenticate(loginDetails);
        call.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                if (response.isSuccessful()) {
                    String token = response.body();
                    tokenManager.setToken(token);
                    // rebuild retrofit object using authorization interceptor
                    retrofit = new Retrofit.Builder()
                            .baseUrl(MyApplication.context.getString(R.string.BaseUrl))
                            .addConverterFactory(GsonConverterFactory.create())
                            .client(AuthUtil.createOkHttpClient())
                            .build();
                } else {
                    // Handle login failure
                    // You can extract the error message from the response if available
                    String errorMessage = response.message();
                    // Handle the error appropriately
                }
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                // Handle failure
            }
        });
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
                    // TODO: Process the user details
                } else {
                    // TODO: Handle unsuccessful response
                    // Extract the error message from the response if available
                    String errorMessage = response.message();
                    // Log the error message
                    System.out.println("Error: " + errorMessage);
                }
            }

            @Override
            public void onFailure(Call<UserDetails> call, Throwable t) {
                // TODO: Handle failure
                // Log the failure message
                System.out.println("Failure: " + t.getMessage());
            }
        });
    }

}
