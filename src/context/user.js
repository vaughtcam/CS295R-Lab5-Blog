import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProvider ({ children }) {
const [user, setUser] = useState(null)


const urlVariable = process.env.REACT_APP_SERVER_URL;

const fetchUser = async (userId, password) => {
let tempUser = null
 const response = await axios.get(`${urlVariable}/users?userid=${userId}&password=${password}`);
 if (response.data.length === 1) {
    tempUser = response.data[0];
}
setUser(tempUser) 
return (tempUser)
}

const editUserById = async (id, newValues) => {
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, newValues);
    const updatedUser = response.data;
    setUser(updatedUser);
  };

  const createUser = async (values) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, values);
    const newUser = response.data;
    setUser(newUser);
  };

const resetUser = () => {
    setUser(null)
}

const userValuetoShare = {user, fetchUser, resetUser, editUserById, createUser}
return(
<UserContext.Provider value = {userValuetoShare}>
    {children}
</UserContext.Provider>
)
}

export default UserContext;
export { UserProvider };



