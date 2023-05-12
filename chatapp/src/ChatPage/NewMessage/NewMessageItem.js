import { useState } from 'react';

function InputMessageForm({ onSubmit }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const messageObject = {
      sender: 'Your sender identifier', // Replace with your sender identifier logic
      receiver: 'Your receiver identifier', // Replace with your receiver identifier logic
      content: message,
      time: new Date(),
    };
    // Call the onSubmit function passed down as a prop
    onSubmit(messageObject);

    // Clear the input field
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
