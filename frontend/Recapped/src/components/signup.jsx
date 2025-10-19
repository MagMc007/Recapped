import './css/auth.css'
import NavBar from './navbar.jsx'
import {Link} from 'react-router-dom'

export default function SignUp({light, setLight}){
    return (
        <>
            <NavBar light={light} setLight={setLight} />
            <div className={light? "authentication-cont light-img": "authentication-cont dark-img"}>
                <div className="login-auth-cont">
                    <h1>Sign Up</h1>
                    <div className="message"></div>
                    <form action="">
                        <input type="text" placeholder="Username" className={light? "light":"dark"} />
                        <input type="email" placeholder="Email" className={light? "light":"dark"} />
                        <input type="password" placeholder="Password" className={light? "light":"dark"} />
                        <input type="password" placeholder="Confirmation" className={light? "light":"dark"} />
                        <button className={light? "auth light": "auth dark"}>Sign Up</button>
                    </form>
                    <p>Already have an account, <Link to="/login">Login</Link></p>
                </div>
            </div>
        </>
    )
}