package com.example.chat_app.API;

public class TokenManager {
    private static String token = null;

    public static String getToken() {
        return token;
    }

    public static void setToken(String newToken) {
        token = newToken;
    }

    public static void logout() {
        token = null;
    }
}
