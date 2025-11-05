import './css/auth.css'
import NavBar from './navbar.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axios.jsx'
import {useEffect} from 'react';


export default function Login({light, setLight}){
    document.title = "Login";
    const [showing, setShowing] =  useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = light ? "lightmode": "darkmode";
    }, [light]);

    async function handleSubmit(e) {
        setMessage("");
        sessionStorage.setItem("Token", "");
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const formData = {username, password};

        //console.log(formData);
        try {
            const response = await api.post("api/auth/login/", formData)
            console.log(response);
            sessionStorage.setItem("Token", response.data.access_token)
            sessionStorage.setItem("Username", response.data.user.username)
            navigate("/home");
        } catch (error) {
            //console.log(error.response.data.non_field_errors[0]);
            setMessage(error.response.data.non_field_errors[0]);
        } finally {
            e.target.reset();
        }
    }

    return (
        <>
            <div className={light? "authentication-cont light-img": "authentication-cont dark-img"}>
                <div className="top-img">
                    <img src={light? "whiteLogo.png":"blackLogo.png"} />
                </div>
                <div className="login-auth-cont">
                    <h1>Login</h1>
                    <div className={ message ? "message show": "message hide" }>
                        <p>{ message }</p>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" required autoComplete="off" name="username" placeholder="Username"className={light? "light":"dark"} />
                        <div className="show-pwd">
                            <input type={showing ? "text": "password"} required name="password" autoComplete="off" placeholder="Password"className={light? "light":"dark"} />
                            <i onClick={() => {setShowing(!showing)}}  className={showing? "bi bi-eye":"bi bi-eye-slash"}></i>
                        </div>
                        <button className={light? "auth light": "auth dark"} type="submit">Login</button>
                    </form>
                    <p>Don't have an account, <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}
 