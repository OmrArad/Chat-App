package com.example.chat_app;

import com.example.chat_app.Model.Entities.UserDetails;

public class SessionInfo {
    private static UserDetails currentUser = null;

    public static UserDetails getCurrentUser() {
        return currentUser;
    }

    public static void setCurrentUser(UserDetails currentUser) {
        SessionInfo.currentUser = currentUser;
    }

    public static void logout() {
        currentUser = null;
    }
}
