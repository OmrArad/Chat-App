import { useState } from 'react';

function InputMessageForm(props) {
  const [content, setContent] = useState('');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = { content: content, timestamp: new Date() };
    if (props.onSubmit && typeof props.onSubmit === 'function') {
      props.onSubmit(newMessage); // Call the onSubmit function with the new message
    }
    setContent(''); // Clear the content state
  };
  
  return (
    <form onSubmit={handleSubmit}>
    <div className="input-group">
      <button type="submit" className="btn btn-primary">
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
      </button>
      <input
        type="text"
        placeholder="Type a message"
        value={content}
        onChange={handleContentChange}
        className="form-control"
      />
    </div>
  </form>
  );
}

export default InputMessageForm;
