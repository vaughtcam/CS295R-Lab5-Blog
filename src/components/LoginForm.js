import { useState, useContext } from "react";

import UserContext from "../context/user";
import { LoginStatus } from '../context/user';

import PostContexts from "../context/posts";

function LoginForm({ onSubmit }) {

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const { fetchUser } = useContext(UserContext);
    const { fetchPosts } = useContext(PostContexts);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const tempUser = await fetchUser(userid, password);
        console.log(tempUser);
        if (tempUser.status === 1) {
            fetchPosts(tempUser.info.id);
            setUserid('');
            setPassword('');
            onSubmit();
        }
        else {
            setError(true)
        }

    }

    return (
        <div className='d-flex flex-row-reverse p-2'>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                {!error ? (<div className="mb-1"></div>) : (<div className="text-danger m-1"> Login Failed </div>)}
                <input id="userid" className="form-control me-2 mb-1" type="text"
                    value={userid} onChange={(event) => { setUserid(event.target.value); }}
                    placeholder="user id" 
                />

                <input id = "password" className = "form-control me-2 mb-1" type = "password"
                value = {password} onChange = {(event) => {setPassword(event.target.value);}}
                placeholder = "password" />

                <button className = "btn btn-primary mb-1" type = "submit"> Login </button>
            </form>
        </div>
    )
}
export default LoginForm