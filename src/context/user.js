import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext();

function Provider ({ children }) {
const [user, setUser] = useState({})


const urlVariable = process.env.REACT_APP_SERVER_URL;
const fetchUser = async (userId, password) => {
 setUser(await axios.get(`${urlVariable}/users?userid=${userId}&password=${password}`))
 return(user);
}

const userValuetoShare = {user, fetchUser}
return(
<UserContext.Provider value = {userValuetoShare}>
    {children}
</UserContext.Provider>
)
}

export default UserContext;
export { Provider };



