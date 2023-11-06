import { useContext } from "react";
import UserContext from "../context/user";
import { useState } from "react";
import LoginForm from "./LoginForm";
import BlogIcon from '../images/blogicon.jpg';


function NavBar() {

    const { user, resetUser } = useContext(UserContext);

    const [showLogin, setShowLogin] = useState(false);

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

    if(showLogin === true){
        loginStuff = <LoginForm onSubmit = {handleLoginSubmit} />
    }
    
    let updateUserProfilebutton = '';

    if(user !== null){
        updateUserProfilebutton = <div><a href = "#"><button>Update User Profile</button></a></div>
    }

    let newPostIcon = '';

    if (user !== null) {
        newPostIcon = <div><a href = "#"><button>New Post</button></a></div>
    }

    return (


        <div>
            <div>
               {loginStuff}
                <nav>
                    <a href = "/"> <img src = {BlogIcon}></img></a>
                    {newPostIcon}
                    {updateUserProfilebutton}
                    <button onClick = {handleClick}>Login or Logout</button>
                </nav>
            </div>
        </div>
    )
}

export default NavBar