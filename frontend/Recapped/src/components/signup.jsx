import './css/auth.css';
import NavBar from './navbar.jsx';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios.jsx';
import {useEffect} from 'react';


export default function SignUp({light, setLight}){
    document.title = "Sign Up";
    // init vars for data handling and redirs
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [showing, setShowing] =  useState(false);

    useEffect(() => {
        document.body.className = light ? "lightmode": "darkmode";
    }, [light]);

    async function handleSubmit(e) {
        sessionStorage.setItem("Token","");
        e.preventDefault();
        setMessage("");
        
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password2 = e.target.password2.value;


        const formData = { username, email, password};
        if (password !== password2) {
            setMessage("Password and Confirmation must match");
        } else {
            // try sending the data
            try {
                const response = await api.post("api/auth/register/", formData);
                console.log(response);
                // store token in session, pretection reason
                sessionStorage.setItem("Token", response.data.access_token);
                sessionStorage.setItem("Username", response.data.user.username)
                navigate("/home");
            } catch (error) {
                //console.log(error.response.data["username"][0]);
                setMessage(error.response.data["username"][0]);
            }finally {
                e.target.reset();
            }
        }
    }

    return (
        <>
            <div className={light? "authentication-cont light-img": "authentication-cont dark-img"}>
                <div className="top-img">
                    <img src={light? "whiteLogo.png":"blackLogo.png"} />
                </div>
                <div className="login-auth-cont">
                    <h1>Sign Up</h1>
                    <div className={ message ? "message show": "message hide" }>
                        <p>{ message }</p>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" autoComplete="off" required placeholder="Username" name="username" className={light? "light":"dark"} />
                        <input type="email" autoComplete="off" required placeholder="Email" name="email" className={light? "light":"dark"} />
                        <div className="show-pwd">
                            <input type={showing ? "text": "password"} autoComplete="off" required placeholder="Password" name="password" className={light? "light":"dark"} id="no-border" />
                            <i onClick={() => {setShowing(!showing)}} className={showing? "bi bi-eye":"bi bi-eye-slash"}></i>
                        </div>
                        <input type="password" autoComplete="off" required placeholder="Confirmation" name="password2" className={light? "light":"dark"} id="pull-up" />
                        <button className={light? "auth light": "auth dark"} type="submit">Sign Up</button>
                    </form>
                    <p>Already have an account, <Link to="/login">Login</Link></p>
                </div>
            </div>
        </>
    )
}