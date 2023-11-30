import UserContext from "../context/user"
import { useContext } from "react"
import Header from './Header'
import PostsList from "./PostsList"
function Home (){
    const {user} = useContext(UserContext)
    return (
        <div>
            <h1>{user !== null ? "My Posts" : "Featured Posts"}</h1>
            <PostsList />
        </div>
    )
}

export default Home