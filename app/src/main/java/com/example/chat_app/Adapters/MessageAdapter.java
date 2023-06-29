package com.example.chat_app.Adapters;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.R;
import com.example.chat_app.SessionInfo;

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
        if (messageList != null && position < messageList.size()) {
            Message message = messageList.get(position);

            if (message.getSender().getUsername() == SessionInfo.getCurrentUser().getUsername()) {
                // Outgoing message
                holder.layoutIncoming.setVisibility(View.GONE);
                holder.layoutOutgoing.setVisibility(View.VISIBLE);
                holder.tvOutgoingTextMessage.setText(message.getContent());
                holder.tvOutgoingTime.setText(message.getCreated());

            } else {
                // Incoming message styling
                holder.layoutIncoming.setVisibility(View.VISIBLE);
                holder.layoutOutgoing.setVisibility(View.GONE);
                holder.tvIncomingTextMessage.setText(message.getContent());
                holder.tvIncomingTime.setText(message.getCreated());
            }
        }

    }

    @Override
    public int getItemCount() {
        return messageList.size();
    }

    static class MessageViewHolder extends RecyclerView.ViewHolder {
        LinearLayout layoutIncoming;
        LinearLayout layoutOutgoing;
        TextView tvIncomingTextMessage;
        TextView tvIncomingTime;
        TextView tvOutgoingTextMessage;
        TextView tvOutgoingTime;

        MessageViewHolder(View itemView) {
            super(itemView);
            layoutIncoming = itemView.findViewById(R.id.layoutIncoming);
            layoutOutgoing = itemView.findViewById(R.id.layoutOutgoing);
            tvIncomingTextMessage = itemView.findViewById(R.id.tvIncomingTextMessage);
            tvIncomingTime = itemView.findViewById(R.id.tvIncomingTime);
            tvOutgoingTextMessage = itemView.findViewById(R.id.tvOutgoingTextMessage);
            tvOutgoingTime = itemView.findViewById(R.id.tvOutgoingTime);
        }
    }
}
