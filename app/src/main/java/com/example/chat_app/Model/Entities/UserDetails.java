package com.example.chat_app.Model.Entities;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class UserDetails {

    @PrimaryKey
    private String username;

    private String displayName;

    private String profilePic;

    public UserDetails(String username, String displayName, String profilePic) {
        this.username = username;
        this.displayName = displayName;
        this.profilePic = profilePic;
    }

    public String getUsername() {
        return username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getProfilePic() {
        return profilePic;
    }
}
