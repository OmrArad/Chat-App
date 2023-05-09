// const [values, setValues] = useState({
//     username: '',
//     password: ''
// })

// function handleChange(e) {
//     setValues({ ...values, [e.target.name]: e.target.value })
// }

function InputFieldItem({ title, id, placeholder }) {
    if (title === "Username") {
        return (
            <div className="form-label-group mb-3">
                <label htmlFor={id}>{title}</label>
                <input type="text" id={id} className="form-control form-floating" placeholder={placeholder} name={title} required></input>
            </div>
        );
    } else {
        return (
            <div className="form-label-group mb-3">
                <label htmlFor={id}>{title}</label>
                <input type="text" id={id} className="form-control form-floating" placeholder={placeholder} name={title} required></input>
            </div>
        );
    }

}

export default InputFieldItem;