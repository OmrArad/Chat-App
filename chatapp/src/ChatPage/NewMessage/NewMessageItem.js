import { useState } from 'react';

function InputMessageForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      sender: 'JohnDoe',
      recipient: 'JaneDoe',
      message,
      timestamp: new Date().toISOString(),
    };
    // Add the new message to the localStorage
    const messages = JSON.parse(localStorage.getItem('../messages.json') || '[]');
    messages.push(newMessage);
    localStorage.setItem('../messages.json', JSON.stringify(messages));
    // Clear the message input
    setMessage('');
  };

  return (
    <form className="input-message" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          name="usermsg"
          type="text"
          className="form-control"
          id="usermsg"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          <i className="fa fa-send"></i>
        </button>
      </div>
    </form>
  );
}

export default InputMessageForm;
