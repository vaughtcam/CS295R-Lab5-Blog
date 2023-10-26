import { createContext, useState, useCallback } from 'react';
import axios from "axios";
const PostContexts = createContext()

function Provider({ children }) {
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

    setFeaturedPosts(response.data);
  }, []);


  const valueToShare = {featuredPosts, categories, posts, fetchFeaturedPosts, fetchCategories, fetchPosts}

}

return (
  < PostContexts.Provider value = {valueToShare} >
    { children }
  </PostContexts.Provider>
)

export default PostContexts
export {Provider}