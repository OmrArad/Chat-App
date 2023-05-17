import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    function handleLogout(e) {

        e.preventDefault();

        // setLoggedIn(false);

        // navigate to login page
        navigate('/login');
        alert("Logging out");

    };

    return (
        <button className="btn btn-danger fa fa-sign-out" onClick={handleLogout} style={{ position: 'absolute', left: '10px', top: '10px' }}>
            <i className="fa fa-sign-out" style={{ color: "white" }}></i>
        </button>
    );
}

export default LogoutButton;