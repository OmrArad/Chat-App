import './LoginPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import { BrowserRouter as Router, Link } from 'react-router-dom';


function LoginPage() {

  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />
  })

  return (
    // Login form
    <form action="" method="post" className="register-card">
      <h1>Login</h1>

      {/* <!-- ChatApp image --> */}
      <img src="chat-06.jpg" className="rounded mx-auto d-block avatar" alt="Avatar"></img>

      {/* <!-- Username and Password input fields --> */}
      {inputList}

      {/* <!-- Login button --> */}
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit" id="login-button">Login</button>
      </div>

      {/* <!-- Checkbox to remember user login details --> */}
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked></input>
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Remember me
        </label>
      </div>

      {/* <!-- Forgot password link --> */}
      <div className="row mt-3">
        <div className="psw col">Forgot <a href="#">password?</a></div>

        {/* <!-- Link to registration page --> */}
        <div id="registerlink" className="col">
          Not registered? <Link to='/register'>Click here</Link> to register
        </div>


      </div>
    </form>
  );
}

export default LoginPage;
