import { Link } from 'react-router-dom';

function RegisterLink() {
    return (
        <div id="registerlink" className="col">
          Not registered? <Link to='/register'>Click here</Link> to register
        </div>
    )
}

export default RegisterLink