import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import bootstrap from "bootstrap";
import { UserProvider } from './context/user'
import { PostProvider } from './context/posts';
import {BrowserRouter} from "react-router-dom";

// DONT FORGET TO PUT THIS IN THE OPENING BROWSER ROUTER ON LINE 16basename = "vaughtc222/CS295R/Lab6/build/"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <PostProvider>
      <BrowserRouter basename = "/~vaughtc222/CS295R/FinalLab/build">
      <App />
      </BrowserRouter >
    </PostProvider>
  </UserProvider>
);


