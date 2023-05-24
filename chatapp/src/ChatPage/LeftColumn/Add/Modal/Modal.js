function Modal({handleSubmit, usernameRef}) {
  return (
    <div
      className="modal fade"
      id="addContactModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addContactModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addContactModalLabel">
              Add new contact
            </h5>
            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 input-group">
                <input type="text" className="form-control" placeholder="Enter name" name="name" ref={usernameRef}></input>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal