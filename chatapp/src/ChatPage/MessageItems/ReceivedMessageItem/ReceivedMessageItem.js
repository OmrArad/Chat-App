function ReceivedMessageItem({message}) {
    return (
        <div className="mb-3">
            <div className="d-flex flex-column align-items-start">
                <span className="badge bg-secondary">{message}</span>
            </div>
        </div>
    );
}

export default ReceivedMessageItem