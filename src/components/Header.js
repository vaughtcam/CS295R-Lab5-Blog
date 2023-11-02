import './Header.css';

function Header (){

    return (
        <div className="fill" style={{backgroundImage: `url('./blogging.jpeg')`}}>
            <img src = "blogging.jpeg"></img>
            <div style={{height: `150px`}}></div>

            This will eventually show a picture!
        </div>
    )
}

export default Header