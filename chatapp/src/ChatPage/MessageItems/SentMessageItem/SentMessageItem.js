function SentMessageItem({message}) {
    return (
        <div className="mb-3">
            <div className="d-flex flex-column align-items-end">
                <span className="badge bg-primary">{message}</span>
            </div>
        </div>
    );
}

export default SentMessageItem