import Header from "../components/Header";
import {useLocation} from "react-router-dom";
function EditPost () {
const location = useLocation()
const post = location.state
console.log(location)
//{post.title}
    return (
        <div>
          Putting some random stuff here just to see stuff
        </div>
    );

}

export default EditPost