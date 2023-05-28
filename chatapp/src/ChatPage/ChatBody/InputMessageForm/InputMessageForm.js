import { useState } from 'react';
import './InputMessageForm.css'


function InputMessageForm(props) {
  const [content, setContent] = useState('');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const sendMessage = e => {
    e.preventDefault();
    // const newMessage = { content: content, timestamp: new Date(), type: 'sent' };
    if (props.onSubmit && typeof props.onSubmit === 'function') {
      props.onSubmit(content); // Call the onSubmit function with the new message
    }
    setContent(''); // Clear the content state
  }

  return (
    <form id="input-message">
      <div className="input-group">
        <button type="submit" className="btn btn-primary" id="send" onClick={sendMessage}>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
        <textarea
          name="text"
          cols="40" 
          rows="3"
          // oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          placeholder="Type a message"
          value={content}
          onChange={handleContentChange}
          className="form-control"
        />
        {/* <input
          type="text"
          placeholder="Type a message"
          value={content}
          onChange={handleContentChange}
          className="form-control"
        /> */}
      </div>
    </form>
  );
}

export default InputMessageForm;
