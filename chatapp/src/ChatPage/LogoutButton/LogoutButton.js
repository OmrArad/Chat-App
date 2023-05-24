import { useNavigate } from "react-router-dom";
import './LogoutButton.css';
function LogoutButton({logout}) {
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        // logs out user and sets loggedIn state to false
        logout();
        // navigate to login page
        navigate('/login');
        alert("Logging out");
    }

    return (
        <button className="btn btn-danger fa fa-sign-out" id="sign-out-btn-main" onClick={handleLogout}>
            <i className="fa fa-sign-out" id="sign-out-btn"></i>
        </button>
    );
}

export default LogoutButton;