package com.example.chat_app.Adapters;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.R;

import java.util.List;

public class MessageAdapter extends RecyclerView.Adapter<MessageAdapter.MessageViewHolder> {

    private List<Message> messageList;

    public MessageAdapter(List<Message> messageList) {
        this.messageList = messageList;
    }

    public void setMessages(List<Message> messages) {
        this.messageList = messages;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public MessageViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_message, parent, false);
        return new MessageViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MessageViewHolder holder, int position) {
        Message message = messageList.get(position);

        // Bind the message data to the views in the ViewHolder
        holder.tvTextMessage.setText(message.getContent());
        holder.tvTime.setText(message.getCreated());

        // Set the appropriate background and alignment based on the message type
        if (message.getSender()) {
            // Incoming message styling
            holder.itemView.setBackgroundResource(R.drawable.bubble_incoming);
            // Set alignment, e.g., left-aligned for incoming messages
            holder.itemView.setForegroundGravity(Gravity.END);
            holder.itemView.setVisibility(View.VISIBLE);
            // holder.tvTextMessage.setGravity(Gravity.START);
        } else {
            // Outgoing message styling
            holder.itemView.setBackgroundResource(R.drawable.bubble_outgoing);
            holder.itemView.setVisibility(View.VISIBLE);
            // Set alignment, e.g., right-aligned for outgoing messages
            // holder.tvTextMessage.setGravity(Gravity.END);
        }
    }

    @Override
    public int getItemCount() {
        return messageList.size();
    }

    static class MessageViewHolder extends RecyclerView.ViewHolder {
        TextView tvTextMessage;
        TextView tvTime;

        MessageViewHolder(View itemView) {
            super(itemView);
            tvTextMessage = itemView.findViewById(R.id.tvTextMessage);
            tvTime = itemView.findViewById(R.id.tvTime);
        }
    }
}
