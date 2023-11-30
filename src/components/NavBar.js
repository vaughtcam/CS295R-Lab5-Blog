import { useContext } from "react";
import UserContext from "../context/user";
import { useState } from "react";
import LoginForm from "./LoginForm";
import BlogIcon from '../images/blogicon.jpg';
import { Link, NavLink, useLocation } from "react-router-dom";
import { BsFillGearFill } from 'react-icons/bs';

function NavBar() {
    const { user, resetUser } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    const location = useLocation();

    const handleClick = (event) => {
        event.preventDefault();

        if (showLogin == false && user === null) {
            setShowLogin(true);
        }

        else if (showLogin == true) {
            setShowLogin(false);
        }

        else {
            resetUser();
        }
    }

    const handleLoginSubmit = () => {
        setShowLogin(false);
    }

    let loginStuff = '';

        if (showLogin === true) {
            loginStuff = <LoginForm onSubmit={handleLoginSubmit} />
        }

    let updateUserProfilebutton = '';

        if (user) {
            updateUserProfilebutton = <button style={{ backgroundColor: "aquamarine" }}><Link to={`/user`}>Edit User Profile</Link></button>
        }

    let newPostButton = '';

        if (user && /^\/$/.test(location.pathname)) {
            newPostButton = <button style={{ backgroundColor: "aquamarine" }} ><Link to="/posts/new">New Post</Link></button>
        }

    let editPostButton = '';

        if (user && /^\/posts\/\d{1,}$/.test(location.pathname)) {
                            editPostButton =  <Link to={`/posts/edit/${location.state.id}`} state={location.state}>
                                <h3><BsFillGearFill /></h3>
                                </Link>}

    return (
        <div>
            <div>
                {loginStuff}
                <nav>
                    <div>
                        {(user) ? <NavLink to="/"> <img src={BlogIcon} height="50"></img> </NavLink> : ""}
                        <div>{newPostButton}</div>
                        <div>{updateUserProfilebutton}</div>
                        <div style={{ textAlign: "right" }}>
                            <button style={{ backgroundColor: "aquamarine" }} onClick={handleClick} type="button">{(!user) ? "Login" : "Logout"}</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default NavBar