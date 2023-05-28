function AddButton() {
    return (
        <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#addContactModal"
            id="add-contact-btn"
        >
            +
        </button>
    )
}

export default AddButton