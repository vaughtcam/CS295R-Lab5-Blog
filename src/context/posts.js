import { createContext, useState, useCallback } from 'react';
import axios from "axios";
const PostContexts = createContext()

function PostProvider({ children }) {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);




  const urlVariable = process.env.REACT_APP_SERVER_URL;

  const fetchFeaturedPosts = useCallback(async () => {
    const response = await axios.get(`${urlVariable}/posts?_expand=user&_sort=datetime&_order=desc& _start=0&_end=12
        `);

    setFeaturedPosts(response.data);
  }, []);

  const fetchCategories = useCallback(async () => {
    const response = await axios.get(`${urlVariable}/categories?_sort=name&_order=asc`);

    setCategories(response.data);
  }, []);


  const fetchPosts = useCallback(async (userId) => {
    const response = await axios.get(`${urlVariable}/posts?userId=${userId}&_expand=user&_sort=date time&_order=desc`);

    setPosts(response.data);
  }, []);

  const deletePostById = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);

    const updatedPosts = posts.filter((post) => {
      return post.id !== id;
    });

    setPosts(updatedPosts);
  };

  const editPostById = async (id, newValues) => {
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, newValues);

    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, ...response.data };
      }
      return post;
    });

    setPosts(updatedPosts);
  };


  const createPost = async (values, user) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, values);
    const newPost = {...response.data, user: user }
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
  };
  
  const valueToShare = {featuredPosts, categories, posts, fetchFeaturedPosts, fetchCategories, fetchPosts, deletePostById, editPostById, createPost};


  return (
    < PostContexts.Provider value = {valueToShare} >
      { children }
    </PostContexts.Provider>
  )
  
}



export default PostContexts;
export {PostProvider};