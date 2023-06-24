package com.example.chat_app.API.Auth;

/**
 * singleton TokenManager class
 */
public class TokenManager {
    private static TokenManager instance;
    private String token;

    // Private constructor to prevent instantiation from outside the class
    private TokenManager() {
    }

    public static TokenManager getInstance() {
        if (instance == null) {
            synchronized (TokenManager.class) {
                if (instance == null) {
                    instance = new TokenManager();
                }
            }
        }
        return instance;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String newToken) {
        token = newToken;
    }

    public void logout() {
        token = null;
    }

    public boolean hasToken() {
        return token != null;
    }
}
