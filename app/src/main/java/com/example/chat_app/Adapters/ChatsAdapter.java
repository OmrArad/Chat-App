package com.example.chat_app.Adapters;

import android.annotation.SuppressLint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chat_app.Model.Entities.Chat;
import com.example.chat_app.Model.Entities.Contact;
import com.example.chat_app.Model.Entities.Message;
import com.example.chat_app.Model.Entities.UserDetails;
import com.example.chat_app.R;

import java.util.List;

public class ChatsAdapter extends RecyclerView.Adapter<ChatsAdapter.ContactViewHolder> {

//    List<Contact> Chats;
    List<Chat> chats;

    private OnContactClickListener contactClickListener;

    public ChatsAdapter(OnContactClickListener contactClickListener) {
        this.contactClickListener = contactClickListener;
    }

    // Setter for the contact click listener
    public void setOnContactClickListener(OnContactClickListener listener) {
        contactClickListener = listener;
    }

    // Setter for the contact list
    @SuppressLint("NotifyDataSetChanged")
    public void setChats(List<Chat> chats) {
        this.chats = chats;
        notifyDataSetChanged();
    }

    public List<Chat> getChats() {
        return chats;
    }

    @NonNull
    @Override
    public ContactViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Inflate the item view layout
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_contact, parent, false);
        return new ContactViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull ContactViewHolder holder, int position) {
        // Get the contact at the current position
//        Contact contact = chats.get(position);
        Chat chat = chats.get(position);
        UserDetails contact = chat.getContact();
        Message lastMessage = chat.getLastMessage();

        // Bind the contact data to the views
        holder.displayName.setText(contact.getDisplayName());
        holder.when.setText(lastMessage.getCreated());
        holder.lastMessage.setText(lastMessage.getContent());
        holder.profilePic.setImageResource(contact.getProfilePic()); // fix profile pic


        // Set the click listener for the contact item
        holder.itemView.setOnClickListener(v -> {
            // Handle the click event for the contact item
            if (contactClickListener != null) {
                contactClickListener.onContactClick(chat);
            }
        });

        // Set the click listener for the contact item
        holder.itemView.setOnLongClickListener(v -> {
            // Handle the click event for the contact item
            if (contactClickListener != null) {
                contactClickListener.onContactLongClick(chat);
            }
            return true;
        });
    }

    @Override
    public int getItemCount() {
        return chats.size();
    }

    public static class ContactViewHolder extends RecyclerView.ViewHolder {
        TextView displayName;
        TextView lastMessage;
        TextView when;
        ImageView profilePic;
        public ContactViewHolder(@NonNull View itemView) {
            super(itemView);
            displayName = itemView.findViewById(R.id.tvDisplayName);
            when = itemView.findViewById(R.id.tvDateTime);
            profilePic = itemView.findViewById(R.id.ivContact);
            lastMessage = itemView.findViewById(R.id.tvLastMessage);
        }
    }

    // Interface for contact click listener
    public interface OnContactClickListener {
        void onContactClick(Chat chat);
        void onContactLongClick(Chat chat);
    }
}
