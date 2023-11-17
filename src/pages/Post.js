import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import parse from 'html-react-parser';
import NavBar from "../components/NavBar";
import UserContext from "../context/user"
import { useContext } from "react"

function Post () {
    const location = useLocation();
    const post = location.state;
    console.log(post)
    const {user} = useContext(UserContext)

    return (

        <div>
            <header style = {{color: "white"}}>Super secret text that nobody can see but moves the post title off the top a little</header>
            {(user) ? ""
            : <NavBar />}
       
            <div style = {{textAlign: "center"}}><b>{post.title}</b></div>
            <header><img src={`data:image/png;base64, ${post.image}`}></img></header>
            
            <div className = "m-2">{parse(post.content)}</div>
        </div>
    );

}

export default Post