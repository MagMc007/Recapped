import './css/auth.css'
import NavBar from './navbar.jsx'
import {Link} from 'react-router-dom'

export default function Login({light, setLight}){
    return (
        <>
            <NavBar light={light} setLight={setLight} />
            <div className={light? "authentication-cont light-img": "authentication-cont dark-img"}>
                <div className="login-auth-cont">
                    <h1>Login</h1>
                    <form action="">
                        <input type="text" placeholder="Username"className={light? "light":"dark"} />
                        <input type="password" placeholder="Password"className={light? "light":"dark"} />
                        <button className={light? "auth light": "auth dark"}>Login</button>
                    </form>
                    <p>Don't have an account, <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}
 