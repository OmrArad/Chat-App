package com.example.chat_app;

import com.example.chat_app.API.Auth.TokenManager;
import com.example.chat_app.Model.Entities.UserDetails;

public class SessionManager {
    private static UserDetails currentUser = null;

    private static TokenManager tokenManager = TokenManager.getInstance();

    public static UserDetails getCurrentUser() {
        return currentUser;
    }

    public static void setCurrentUser(UserDetails currentUser) {
        SessionManager.currentUser = currentUser;
    }

    public static void logout() {
        currentUser = null;
        tokenManager.logout();
    }
}
