package com.example.chat_app;


import android.os.Bundle;
import android.view.MenuItem;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.Toast;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;


public class SettingsActivity extends AppCompatActivity {

    private Switch themeSwitch;
    private EditText serverInput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Set the theme based on the saved preference
        boolean isDarkTheme = getSharedPreferences("MyPrefs", MODE_PRIVATE)
                .getBoolean("isDarkTheme", false);
        setTheme(isDarkTheme ? R.style.AppTheme_Dark : R.style.AppTheme_Light);

        setContentView(R.layout.settings_activity);
        // change the theme for all the other activities


        themeSwitch = findViewById(R.id.themeSwitch);
        serverInput = findViewById(R.id.serverInput);

        // Set the initial state of the switch based on the saved preference
        themeSwitch.setChecked(isDarkTheme);

        // Set the listener for the switch
        themeSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean isChecked) {
                // Save the preference for theme change
                getSharedPreferences("MyPrefs", MODE_PRIVATE)
                        .edit()
                        .putBoolean("isDarkTheme", isChecked)
                        .apply();

                // Apply the selected theme
                if (isChecked) {
                    setTheme(R.style.AppTheme_Dark);
                    Toast.makeText(SettingsActivity.this, "Dark theme applied", Toast.LENGTH_SHORT).show();
                } else {
                    setTheme(R.style.AppTheme_Light);
                    Toast.makeText(SettingsActivity.this, "Light theme applied", Toast.LENGTH_SHORT).show();
                }
                // Recreate the activity to apply the theme change
                recreate();
            }
        });

        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
