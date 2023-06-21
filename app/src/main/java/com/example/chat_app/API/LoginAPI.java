package com.example.chat_app.API;

import com.example.chat_app.MyApplication;
import com.example.chat_app.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginAPI {
    private String authToken;

    private Retrofit retrofit;

    private WebServiceAPI webServiceAPI;

    public LoginAPI() {

        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        webServiceAPI = retrofit.create(WebServiceAPI.class);

    }

    public void login(String username, String password) {
        // Create a request object containing the username and password
        // Make the API call to log in the user
        Call<String> call = webServiceAPI.login(new AuthRequest(username, password));
        call.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                if (response.isSuccessful()) {
                    String token = response.body();
                    TokenManager.setToken(token);
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

}
