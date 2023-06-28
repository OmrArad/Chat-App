package com.example.chat_app;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.Toast;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import com.example.chat_app.Settings.GlobalVariables;

public class SettingsActivity extends BaseActivity {
    private Switch themeSwitch;
    private EditText serverInput;
    private Button saveButton;
    private String updatedServerUrl;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Retrieve the current theme
        boolean isDarkTheme = getSharedPreferences("MyPrefs", MODE_PRIVATE)
                .getBoolean("isDarkTheme", false);
        setTheme(isDarkTheme ? R.style.AppTheme_Dark : R.style.AppTheme_Light);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.settings_activity);

        themeSwitch = findViewById(R.id.themeSwitch);
        serverInput = findViewById(R.id.serverInput);
        serverInput.setText(GlobalVariables.getServerBaseUrl(this));

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

        saveButton = findViewById(R.id.saveButton);
        saveButton.setOnClickListener(v -> saveServerUrl());

        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            // Set the result to indicate that the theme was changed
            Intent resultIntent = new Intent();
            resultIntent.putExtra("themeChanged", true);
            setResult(RESULT_OK, resultIntent);

            finish(); // Finish the activity instead of calling onBackPressed()
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void saveServerUrl() {
        updatedServerUrl = serverInput.getText().toString();
        GlobalVariables.setServerBaseUrl(updatedServerUrl);
        Toast.makeText(this, "Server URL saved: " + updatedServerUrl, Toast.LENGTH_SHORT).show();
    }
}
