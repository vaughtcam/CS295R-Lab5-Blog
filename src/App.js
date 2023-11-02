import './App.css';
import { useEffect, useContext } from 'react';
import PostContexts from './context/posts';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PostsList from './components/PostsList';


function App() {

  const {fetchFeaturedPosts, fetchCategories} = useContext (PostContexts);

  useEffect(() => {
    fetchFeaturedPosts();
    fetchCategories();
  }, [fetchFeaturedPosts,fetchCategories]);

 
  
  return (
 <div>
    <NavBar />
    <Home />
    
    
 </div>)
}

export default App;
