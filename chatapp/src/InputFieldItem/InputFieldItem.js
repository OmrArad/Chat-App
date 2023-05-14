import './InputFieldItem.css'

function InputFieldItem({ title, id, type, placeholder, handleChange, error }){
    if (handleChange === undefined) {
        handleChange = () => null;
    }

    return (
        <div className="form-label-group mb-3">
            <label htmlFor={id}>{title}</label>
            <input type={type} id={id} className="form-control form-floating" placeholder={placeholder}
                   onChange={handleChange} required></input>
            <div className={'inputErrorText'} >{error}</div>
        </div>
    );
}

export default InputFieldItem;