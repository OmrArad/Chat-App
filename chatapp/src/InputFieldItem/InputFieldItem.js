function InputFieldItem({ title, id, placeholder }){
    return (
        <div className="form-label-group mb-3">
            <label htmlFor={id}>{title}</label>
            <input type="text" id={id} className="form-control form-floating" placeholder={placeholder} required></input>
        </div>
    );
}

export default InputFieldItem;