function SubmitButton({title, id, type}) {
    return (
        <button type={type} id={id} className="col-sm-3 btn btn-primary">
            {title}
        </button>
    );
}

export default SubmitButton;