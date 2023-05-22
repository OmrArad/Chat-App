function SubmitButton({title, id, type, onSubmit}) {
    return (
        <button type={type} id={id} className="col-sm-3 btn btn-primary" onClick={onSubmit}>
            {title}
        </button>
    );
}

export default SubmitButton;