function MessageItem({ message }) {
  return (
    <div className="mb-3">
      <div className="d-flex flex-column align-items-start" style={{ maxWidth: '100%' }}>
        <div className="badge bg-primary" style={{ maxWidth: '40%', overflow: 'hidden'
        , textOverflow: 'ellipsis',
        whiteSpace: 'break-spaces' }}>
        {message}
        </div>
      </div>
    </div>
  );
  }
  
  export default MessageItem;