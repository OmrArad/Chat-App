package com.example.chat_app.Adapters;

import android.annotation.SuppressLint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chat_app.ContactsPage.Contact;
import com.example.chat_app.R;

import java.util.List;

public class ContactsAdapter extends RecyclerView.Adapter<ContactsAdapter.ContactViewHolder> {

    List<Contact> contacts;

    private OnContactClickListener contactClickListener;

    public ContactsAdapter(OnContactClickListener contactClickListener) {
        this.contactClickListener = contactClickListener;
    }

    // Setter for the contact click listener
    public void setOnContactClickListener(OnContactClickListener listener) {
        contactClickListener = listener;
    }

    // Setter for the contact list
    @SuppressLint("NotifyDataSetChanged")
    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
        notifyDataSetChanged();
    }

    public List<Contact> getContacts() {
        return contacts;
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
            if (contactClickListener != null) {
                contactClickListener.onContactClick(contact);
            }
        });

        // Set the click listener for the contact item
        holder.itemView.setOnLongClickListener(v -> {
            // Handle the click event for the contact item
            if (contactClickListener != null) {
                contactClickListener.onContactLongClick(contact);
                notifyDataSetChanged();
            }
            return true;
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

    // Interface for contact click listener
    public interface OnContactClickListener {
        void onContactClick(Contact contact);
        void onContactLongClick(Contact contact);
    }
}
