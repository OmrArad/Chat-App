package com.example.chat_app.Settings;

import android.content.Context;
import com.example.chat_app.R;

public class GlobalVariables {
    private static String serverBaseUrl;

    public static String getServerBaseUrl(Context context) {
        if (serverBaseUrl == null) {
            // change it to your server ip
            serverBaseUrl = "http://192.168.4.115:5000/api/";
        }
        return serverBaseUrl;
    }

    public static void setServerBaseUrl(String serverBaseUrl) {
        GlobalVariables.serverBaseUrl = serverBaseUrl;
    }
}
