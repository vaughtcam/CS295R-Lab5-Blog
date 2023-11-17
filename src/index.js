import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import bootstrap from "bootstrap";
import { UserProvider } from './context/user'
import { PostProvider } from './context/posts';
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <PostProvider>
      <BrowserRouter >
      <App />
      </BrowserRouter >
    </PostProvider>
  </UserProvider>
);


