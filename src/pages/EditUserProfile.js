import Header from "../components/Header";
import UserContext from "../context/user"
import { useContext } from "react"
function EditUserProfile () {

    const {user} = useContext(UserContext)
    return (
        <div>
            <header><img src={`data:image/png;base64, ${user.image}`}></img></header>
        <h1>{user.name} </h1>
        {user.bio}
        
        </div>
    );

}

export default EditUserProfile