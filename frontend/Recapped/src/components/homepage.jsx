import './css/homepage.css'
import NavBar from './navbar.jsx'
import {Link} from 'react-router-dom'


export default function HomePage({light, setLight}) {

    return (
        <>
            <NavBar  light={light} setLight={setLight} />
            <div className="homepage-cont">
                <div className="info-cont">
                    <h1>Welcome to <span>Recapped</span></h1><br />
                    <p>Redefine recaps and experience stories unfolding in seconds.</p>
                    <div className="user-redirs">
                        <Link to="/signup"  className="auth redirs get-started">
                            Get statrted  &rarr;
                        </Link>
                        <Link to="/login" className="auth redirs login">
                            Login
                        </Link>
                    </div>
                </div>
                <div className="image-cont">
                    <img src={light ? "whiteLogo.png": "blackLogo.png"} alt="image" />
                </div>
            </div>
        </>
    )
}