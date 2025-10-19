import './css/auth.css'
import NavBar from './navbar.jsx'

export default function Login({light, setLight}){
    return (
        <>
            <NavBar light={light} setLight={setLight} />
            <div className="auth-cont">
                <div className="login-cont">
                    
                </div>
                <div className="image-cont">
                    <img src={light ? "whiteLogo.png": "blackLogo.png"} alt="image" />
                </div>
            </div>
        </>
    )
}
 