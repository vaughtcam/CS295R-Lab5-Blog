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

const resetUser = () => {
    setUser(null)
}


/*const editUserById = async (userId, )=> //again, not sure about second parameter
{
    const response = await axios.put(`${urlVariable}/users?userid=${userId}&password=${password}`,
    {})
//not sure what to put in the second argument, but I am guessing it has to do with the second parameter
    setUser(response.data);
}


const createUser = async () => //haha same story as before, but once I get it once all of these will be easy
{
    const response = await axios.post(`${urlVariable}/users?userid=${userId}&password=${password}`)

    setUser(response.data)
}
 
const resetUser = () => {
    //I am not sure how to handle this part yet because we have not touched anything with the login/out
    setUser(null)
}
*/



const userValuetoShare = {user, fetchUser, resetUser}
return(
<UserContext.Provider value = {userValuetoShare}>
    {children}
</UserContext.Provider>
)
}

export default UserContext;
export { UserProvider };



