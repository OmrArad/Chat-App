package com.example.chat_app.API.Auth;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class AuthUtil {

    private static class AuthInterceptor implements Interceptor {
        @Override
        public Response intercept(Chain chain) throws IOException {
            Request originalRequest = chain.request();
            // TODO: parameterize TokenManager instance for modularity
            Request.Builder requestBuilder = originalRequest.newBuilder()
                    .header("Authorization", "Bearer " + TokenManager.getInstance().getToken())
                    .method(originalRequest.method(), originalRequest.body());
            Request request = requestBuilder.build();
            return chain.proceed(request);
        }
    }

    public static OkHttpClient createOkHttpClient() {
        OkHttpClient.Builder httpClientBuilder = new OkHttpClient.Builder();

        // Add the AuthInterceptor to include the authorization header
        httpClientBuilder.addInterceptor(new AuthInterceptor());

        return httpClientBuilder.build();
    }

}
