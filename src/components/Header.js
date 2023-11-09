import './Header.css';
import BlogHeaderPic from '../images/Blog.jpeg';

function Header (){

    return (
        <div className="fill" style={{backgroundImage: `url(${BlogHeaderPic})`}}>
            <div style={{height: `350px`}}></div>
        </div>
    )
}

export default Header