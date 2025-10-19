import './css/auth.css'
import NavBar from './navbar.jsx'

export default function SignUp({light, setLight}){
    return (
        <>
            <NavBar light={light} setLight={setLight} />
            <div className="auth-cont">
                <h1>This is signup page</h1>
            </div>
        </>
    )
}