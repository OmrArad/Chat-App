package com.example.chat_app.Model.Entities;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.io.Serializable;

@Entity(tableName = "contacts")
public class Contact implements Serializable {

    @PrimaryKey(autoGenerate = true)
    private int id;


    private String displayName;

    private int profilePic;

    private String lastMessage;

    private String when;

    public Contact(int profileImage, String displayName, String lastMessage, String when) {
        this.profilePic = profileImage;
        this.displayName = displayName;
        this.lastMessage = lastMessage;
        this.when = when;
    }

    public Contact() {
    }

    public int getId() {
        return id;
    }

    public int getProfilePic() {
        return profilePic;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public String getWhen() {
        return when;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public void setWhen(String when) {
        this.when = when;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void setProfilePic(int profilePic) {
        this.profilePic = profilePic;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", displayName='" + displayName + '\'' +
                ", profilePic=" + profilePic +
                ", lastMessage='" + lastMessage + '\'' +
                ", when='" + when + '\'' +
                '}';
    }
}
