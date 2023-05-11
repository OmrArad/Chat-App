function currentChatItem({ message, user }) {
  return (
    <div className="current-chat-item">
      <div className="current-chat-item__user">{user}</div>
      <div className="current-chat-item__message">{message}</div>
    </div>
  );
}
