import { createContext, useState, useCallback } from 'react';
import axios from "axios";
const PostContexts = createContext()

function PostProvider({ children }) {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);




  const urlVariable = process.env.REACT_APP_SERVER_URL;
  const fetchFeaturedPosts = useCallback(async () => {
    const response = await axios.get(`${urlVariable}/posts_expand=user&_sort=datetime&_order=desc& _start=0&_end=12
        `);

    setFeaturedPosts(response.data);
  }, []);

  const fetchCategories = useCallback(async () => {
    const response = await axios.get(`${urlVariable}/categories?_sort=name&_order=asc`);

    setCategories(response.data);
  }, []);


  const fetchPosts = useCallback(async (userId) => {
    const response = await axios.get(`${urlVariable}http://localhost:5000/posts?userId=${userId}&_expand=user&_sort=date time&_order=desc`);

    setPosts(response.data);
  }, []);

  const deletePostById = useCallback(async (postId) => //Not sure where to get userId to put in the function, so just put postId as a filler for now
  {
       const response = await axios.delete(`${urlVariable}http://localhost:5000/posts?id=${postId}`);
       console.log(response.data)

       const newPosts = posts.filter( (post) => {
        if(post.id !== postId)
        return(true)

        else 
        return (false)
       })
      setPosts(newPosts)
  }, []);

  const editPostById = useCallback (async (postId,) => //not sure what to put as the second parameter, function expresssion not finished
   {
     const response = await axios.put(`${urlVariable}http://localhost:5000/posts?userId=${postId}&_expand=user&_sort=date time&_order=desc`)

     setPosts(response.data);

   },[]);

  const createPost = useCallback( async (newPost, user) => //same as deletePostById
  {
    const response = await axios.post(`${urlVariable}http://localhost:5000/posts?userId=${postId}&_expand=user&_sort=date time&_order=desc`,
    {
      newPost,
      user: {user}
    })

    setPosts(response.data)
  }
  );
 
  const valueToShare = {featuredPosts, categories, posts, fetchFeaturedPosts, fetchCategories, fetchPosts, deletePostById}


  return (
    < PostContexts.Provider value = {valueToShare} >
      { children }
    </PostContexts.Provider>
  )
}



export default PostContexts
export {PostProvider}