package com.example.chat_app.API;

import com.example.chat_app.Model.Entities.UserDetails;
import com.example.chat_app.API.Entities.UserNamePass;
import com.example.chat_app.MyApplication;
import com.example.chat_app.R;
import com.example.chat_app.Settings.GlobalVariables;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegisterAPI {
    private Retrofit retrofit;
    private WebServiceAPI webServiceAPI;

    public RegisterAPI() {
        retrofit = new Retrofit.Builder()
                .baseUrl(GlobalVariables.getServerBaseUrl(MyApplication.context))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void register(UserNamePass formData) {
        // Make the API call to register the user
        Call<UserDetails> call = webServiceAPI.register(formData);
        call.enqueue(new Callback<UserDetails>() {
            @Override
            public void onResponse(Call<UserDetails> call, Response<UserDetails> response) {
                if (response.isSuccessful()) {
                    // Handle successful response
                    UserDetails userDetails = response.body();
                    System.out.println(userDetails);

                } else {
                    // Handle unsuccessful response
                    String errorMessage = response.message();
                    System.out.println(errorMessage);
                }
            }

            @Override
            public void onFailure(Call<UserDetails> call, Throwable t) {
                // Handle failure
                // TODO: Handle the failure appropriately
                String errorMessage = t.getMessage();
                System.out.println(errorMessage);
            }
        });
    }


}
