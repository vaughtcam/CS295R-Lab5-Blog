import { useContext } from "react";
import UserContext from "../context/user";
import { useState } from "react";
import LoginForm from "./LoginForm";


function NavBar() {

    const { user, resetUser } = useContext(UserContext);

    const [showLogin, setShowLogin] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();

        if (showLogin == false && user == null) {
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




    return (


        <div>
            <div>
                <LoginForm onSubmit = {handleLoginSubmit}/>
                <nav>
                    <div> Brand or Logo </div>
                    <button>New Post</button>
                    <button>Update User Profile</button>
                    <button>Login or Logout</button>
                </nav>
            </div>
        </div>
    )
}

export default NavBar