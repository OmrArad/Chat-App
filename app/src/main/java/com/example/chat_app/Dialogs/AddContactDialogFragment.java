//package com.example.chat_app.Dialogs;
//
//import android.app.Dialog;
//import android.content.Context;
//import android.content.DialogInterface;
//import android.os.Bundle;
//
//import androidx.appcompat.app.AlertDialog;
//import androidx.fragment.app.DialogFragment;
//import androidx.lifecycle.ViewModelProvider;
//
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//
//import com.example.chat_app.Model.Entities.Chat;
//import com.example.chat_app.Model.Entities.Contact;
//import com.example.chat_app.R;
//import com.example.chat_app.ViewModels.ChatsViewModel;
//import com.example.chat_app.databinding.FragmentAddContactBinding;
//
//public class AddContactDialogFragment extends DialogFragment {
//
//    private FragmentAddContactBinding binding;
//    private ChatsViewModel chatsViewModel;
//
//
//    /* The activity that creates an instance of this dialog fragment must
//     * implement this interface in order to receive event callbacks.
//     * Each method passes the DialogFragment in case the host needs to query it. */
//    public interface AddContactDialogListener {
//        public void onDialogPositiveClick(DialogFragment dialog);
//        public void onDialogNegativeClick(DialogFragment dialog);
//    }
//
//    // Use this instance of the interface to deliver action events
//    AddContactDialogListener listener;
//
//    // Override the Fragment.onAttach() method to instantiate the NoticeDialogListener
//    @Override
//    public void onAttach(Context context) {
//        super.onAttach(context);
//        // Verify that the host activity implements the callback interface
//        try {
//            // Instantiate the NoticeDialogListener so we can send events to the host
//            listener = (AddContactDialogListener) context;
//        } catch (ClassCastException e) {
//            // The activity doesn't implement the interface, throw exception
//            throw new ClassCastException("Activity must implement NoticeDialogListener");
//        }
//    }
//
//    @Override
//    public Dialog onCreateDialog(Bundle savedInstanceState) {
//
//        binding = FragmentAddContactBinding.inflate(getLayoutInflater());
//        chatsViewModel = new ViewModelProvider(this).get(ChatsViewModel.class);
//
//        // Build the dialog and set up the button click handlers
//        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
//        // Get the layout inflater
//        LayoutInflater inflater = requireActivity().getLayoutInflater();
//
//        // Inflate and set the layout for the dialog
//        // Pass null as the parent view because its going in the dialog layout
//        builder.setView(inflater.inflate(R.layout.fragment_add_contact, null))
//                .setPositiveButton(R.string.add, new DialogInterface.OnClickListener() {
//                    public void onClick(DialogInterface dialog, int id) {
//                        String displayName = binding.etContent.getText().toString().trim();
//
//                        int profilePicId = getResources().getIdentifier("p1", "drawable", getActivity().getCallingPackage());
//
//                        if (displayName.isEmpty()) {
//                            binding.etContent.setError("Please enter a display name");
//                            binding.etContent.requestFocus();
//                            return;
//                        }
//
////                        Contact contact = new Contact(profilePicId, displayName, "goodbye", "yesterday 11:14");
//                        Chat chat = new Chat();
//                        chatsViewModel.insert(chat);
//
//                        // Send the positive button event back to the host activity
//                        listener.onDialogPositiveClick(AddContactDialogFragment.this);
//                    }
//                })
//                .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
//                    public void onClick(DialogInterface dialog, int id) {
//                        // Send the negative button event back to the host activity
////                        listener.onDialogNegativeClick(NoticeDialogFragment.this);
//                    }
//                });
//        return builder.create();
//    }
//
//    @Override
//    public View onCreateView(LayoutInflater inflater, ViewGroup container,
//                             Bundle savedInstanceState) {
//        // Inflate the layout for this fragment
//        return inflater.inflate(R.layout.fragment_add_contact, container, false);
//    }
//}