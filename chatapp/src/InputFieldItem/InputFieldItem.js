function InputFieldItem({ title, id, type, placeholder, handleFileUpload }){
    const handleChange = (event) => {
        if (handleFileUpload) {
            handleFileUpload(event);
        }
    };

    return (
        <div className="form-label-group mb-3">
            <label htmlFor={id}>{title}</label>
            <input type={type} id={id} className="form-control form-floating" placeholder={placeholder}
                   onChange={handleChange} required></input>
        </div>
    );
}

export default InputFieldItem;