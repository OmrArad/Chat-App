package com.example.chat_app.API.Entities;

public class SendMessage {
    private String msg;

    public SendMessage(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
