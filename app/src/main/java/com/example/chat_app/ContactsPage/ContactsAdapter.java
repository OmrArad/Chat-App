package com.example.chat_app.ContactsPage;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chat_app.ActiveChatActivity;
import com.example.chat_app.R;

import java.util.List;

public class ContactsAdapter extends RecyclerView.Adapter<ContactsAdapter.ContactViewHolder> {
    
    List<Contact> contacts;

    private Context context;
    
    public ContactsAdapter(Context context, List<Contact> contacts) {
        this.context = context;
        this.contacts = contacts;
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
        Contact contact = contacts.get(position);

        // Bind the contact data to the views
        holder.displayName.setText(contact.getDisplayName());
        holder.when.setText(contact.getWhen());
        holder.lastMessage.setText(contact.getLastMessage());
        holder.profilePic.setImageResource(contact.getProfilePic());


        // Set the click listener for the contact item
        holder.itemView.setOnClickListener(v -> {
            // Handle the click event for the contact item
            onContactClicked(contact);
        });
    }

    @Override
    public int getItemCount() {
        return contacts.size();
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

    private void onContactClicked(Contact contact) {
        // Handle the click event for the contact item
        // Perform any necessary actions here, such as opening the chat page
        // Pass the selected contact's details to the chat page
        Intent intent = new Intent(context, ActiveChatActivity.class);
        intent.putExtra("contact", contact);
        context.startActivity(intent);
    }
}
