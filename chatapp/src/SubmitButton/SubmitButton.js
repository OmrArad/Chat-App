function SubmitButton({title, id, type}) {
    return (
        <button type={type} id={id} className="col-sm-3">
            {title}
        </button>
    );
}

export default SubmitButton;