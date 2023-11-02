import UserContext from "../context/user"
import { useContext } from "react"
import Header from './Header'
import PostsList from "./PostsList"
function Home (){


    const {user} = useContext(UserContext)
    

//consists of Navbar, header and postslist 
    return (
        <div>
            
            < Header />;
            <h1>
                {user !== null ? "My Posts" : "Featured Posts"}
            </h1>
            <PostsList />;
           
        </div>

        
    )
}

export default Home