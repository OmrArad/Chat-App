package com.example.chat_app.ContactsPage;

import android.database.Cursor;
import androidx.room.EntityDeletionOrUpdateAdapter;
import androidx.room.EntityInsertionAdapter;
import androidx.room.RoomDatabase;
import androidx.room.RoomSQLiteQuery;
import androidx.room.util.CursorUtil;
import androidx.room.util.DBUtil;
import androidx.sqlite.db.SupportSQLiteStatement;
import java.lang.Class;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@SuppressWarnings({"unchecked", "deprecation"})
public final class ContactDao_Impl implements ContactDao {
  private final RoomDatabase __db;

  private final EntityInsertionAdapter<Contact> __insertionAdapterOfContact;

  private final EntityDeletionOrUpdateAdapter<Contact> __deletionAdapterOfContact;

  private final EntityDeletionOrUpdateAdapter<Contact> __updateAdapterOfContact;

  public ContactDao_Impl(RoomDatabase __db) {
    this.__db = __db;
    this.__insertionAdapterOfContact = new EntityInsertionAdapter<Contact>(__db) {
      @Override
      public String createQuery() {
        return "INSERT OR ABORT INTO `Contact` (`id`,`displayName`,`profilePic`,`lastMessage`,`when`) VALUES (nullif(?, 0),?,?,?,?)";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, Contact value) {
        stmt.bindLong(1, value.getId());
        if (value.getDisplayName() == null) {
          stmt.bindNull(2);
        } else {
          stmt.bindString(2, value.getDisplayName());
        }
        stmt.bindLong(3, value.getProfilePic());
        if (value.getLastMessage() == null) {
          stmt.bindNull(4);
        } else {
          stmt.bindString(4, value.getLastMessage());
        }
        if (value.getWhen() == null) {
          stmt.bindNull(5);
        } else {
          stmt.bindString(5, value.getWhen());
        }
      }
    };
    this.__deletionAdapterOfContact = new EntityDeletionOrUpdateAdapter<Contact>(__db) {
      @Override
      public String createQuery() {
        return "DELETE FROM `Contact` WHERE `id` = ?";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, Contact value) {
        stmt.bindLong(1, value.getId());
      }
    };
    this.__updateAdapterOfContact = new EntityDeletionOrUpdateAdapter<Contact>(__db) {
      @Override
      public String createQuery() {
        return "UPDATE OR ABORT `Contact` SET `id` = ?,`displayName` = ?,`profilePic` = ?,`lastMessage` = ?,`when` = ? WHERE `id` = ?";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, Contact value) {
        stmt.bindLong(1, value.getId());
        if (value.getDisplayName() == null) {
          stmt.bindNull(2);
        } else {
          stmt.bindString(2, value.getDisplayName());
        }
        stmt.bindLong(3, value.getProfilePic());
        if (value.getLastMessage() == null) {
          stmt.bindNull(4);
        } else {
          stmt.bindString(4, value.getLastMessage());
        }
        if (value.getWhen() == null) {
          stmt.bindNull(5);
        } else {
          stmt.bindString(5, value.getWhen());
        }
        stmt.bindLong(6, value.getId());
      }
    };
  }

  @Override
  public void insert(final Contact... contacts) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __insertionAdapterOfContact.insert(contacts);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void delete(final Contact... contacts) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __deletionAdapterOfContact.handleMultiple(contacts);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void update(final Contact... contacts) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __updateAdapterOfContact.handleMultiple(contacts);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public List<Contact> index() {
    final String _sql = "SELECT * FROM contact";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfDisplayName = CursorUtil.getColumnIndexOrThrow(_cursor, "displayName");
      final int _cursorIndexOfProfilePic = CursorUtil.getColumnIndexOrThrow(_cursor, "profilePic");
      final int _cursorIndexOfLastMessage = CursorUtil.getColumnIndexOrThrow(_cursor, "lastMessage");
      final int _cursorIndexOfWhen = CursorUtil.getColumnIndexOrThrow(_cursor, "when");
      final List<Contact> _result = new ArrayList<Contact>(_cursor.getCount());
      while(_cursor.moveToNext()) {
        final Contact _item;
        _item = new Contact();
        final int _tmpId;
        _tmpId = _cursor.getInt(_cursorIndexOfId);
        _item.setId(_tmpId);
        final String _tmpDisplayName;
        if (_cursor.isNull(_cursorIndexOfDisplayName)) {
          _tmpDisplayName = null;
        } else {
          _tmpDisplayName = _cursor.getString(_cursorIndexOfDisplayName);
        }
        _item.setDisplayName(_tmpDisplayName);
        final int _tmpProfilePic;
        _tmpProfilePic = _cursor.getInt(_cursorIndexOfProfilePic);
        _item.setProfilePic(_tmpProfilePic);
        final String _tmpLastMessage;
        if (_cursor.isNull(_cursorIndexOfLastMessage)) {
          _tmpLastMessage = null;
        } else {
          _tmpLastMessage = _cursor.getString(_cursorIndexOfLastMessage);
        }
        _item.setLastMessage(_tmpLastMessage);
        final String _tmpWhen;
        if (_cursor.isNull(_cursorIndexOfWhen)) {
          _tmpWhen = null;
        } else {
          _tmpWhen = _cursor.getString(_cursorIndexOfWhen);
        }
        _item.setWhen(_tmpWhen);
        _result.add(_item);
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public Contact get(final int id) {
    final String _sql = "SELECT * FROM contact WHERE id = ?";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    _statement.bindLong(_argIndex, id);
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfDisplayName = CursorUtil.getColumnIndexOrThrow(_cursor, "displayName");
      final int _cursorIndexOfProfilePic = CursorUtil.getColumnIndexOrThrow(_cursor, "profilePic");
      final int _cursorIndexOfLastMessage = CursorUtil.getColumnIndexOrThrow(_cursor, "lastMessage");
      final int _cursorIndexOfWhen = CursorUtil.getColumnIndexOrThrow(_cursor, "when");
      final Contact _result;
      if(_cursor.moveToFirst()) {
        _result = new Contact();
        final int _tmpId;
        _tmpId = _cursor.getInt(_cursorIndexOfId);
        _result.setId(_tmpId);
        final String _tmpDisplayName;
        if (_cursor.isNull(_cursorIndexOfDisplayName)) {
          _tmpDisplayName = null;
        } else {
          _tmpDisplayName = _cursor.getString(_cursorIndexOfDisplayName);
        }
        _result.setDisplayName(_tmpDisplayName);
        final int _tmpProfilePic;
        _tmpProfilePic = _cursor.getInt(_cursorIndexOfProfilePic);
        _result.setProfilePic(_tmpProfilePic);
        final String _tmpLastMessage;
        if (_cursor.isNull(_cursorIndexOfLastMessage)) {
          _tmpLastMessage = null;
        } else {
          _tmpLastMessage = _cursor.getString(_cursorIndexOfLastMessage);
        }
        _result.setLastMessage(_tmpLastMessage);
        final String _tmpWhen;
        if (_cursor.isNull(_cursorIndexOfWhen)) {
          _tmpWhen = null;
        } else {
          _tmpWhen = _cursor.getString(_cursorIndexOfWhen);
        }
        _result.setWhen(_tmpWhen);
      } else {
        _result = null;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  public static List<Class<?>> getRequiredConverters() {
    return Collections.emptyList();
  }
}
