import './App.css';
import { useEffect, useContext } from 'react';
import PostContexts from './context/posts';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PostsList from './components/PostsList';
import Layout from './components/Layout';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import UserContext from "./context/user";
import EditUserProfile from './pages/EditUserProfile';
import Post from './pages/Post';
import EditPost from './pages/EditPost';


function App() {

  const { fetchFeaturedPosts, fetchCategories } = useContext(PostContexts);
  const { user } = useContext(UserContext);
  const location = useLocation()
  //<Route path="posts/edit/:id" element={(user && location && location.state && user.id === location.state) ? <EditPost /> : <Navigate replace to={"/"} />} />

  useEffect(() => {
    fetchFeaturedPosts();
    fetchCategories();
  }, [fetchFeaturedPosts, fetchCategories]);



  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="user" element={
          (user) ? <EditUserProfile /> : <Navigate replace to={"/"} />
        } />

        <Route path="posts/new" element={
          (user) ? <EditPost /> : <Navigate replace to={"/"} />
        } />
        <Route path="posts/edit/:id" element={(user && location && location.state && user.id === location.state.userId) ? <EditPost /> : <Navigate replace to={"/"} />} />

        <Route path="*" />
      </Route>

      <Route>
        <Route path="posts/:id" element={<Post />} />
      </Route>
    </Routes>

  )
}

export default App;
