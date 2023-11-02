import { useContext } from "react"
import UserContext from "../context/user"
import PostContexts from "../context/posts"
import PostCard from "./PostCard";

function PostsList() {
    const { user } = useContext(UserContext);
    const { posts, featuredPosts } = useContext(PostContexts);

    let postsToRender = user !== null ? posts : featuredPosts
    
    const renderedPosts = postsToRender.map((post) =>{
        return <PostCard key = {post.id} post = {post} />;})

    return (
        <div className = "row row-cols-1 row-cols-md-3">
            {renderedPosts}
        </div>
    )
}

export default PostsList