import './css/auth.css';
import NavBar from './navbar.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState } from 'react';
import api from '../api/axios.jsx';


export default function SignUp({light, setLight}){
    document.title = "Sign Up";
    // init vars for data handling and redirs
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const formData = { username, email, password};

        //console.log(formData);

        // try sending the data
        try {
            const response = await api.post("api/auth/register/", formData);
            console.log(response);
        } catch (error) {
            //console.log(error.response.data["username"][0]);
            setMessage(error.response.data["username"][0])
        }

    }

    return (
        <>
            <NavBar light={light} setLight={setLight} />
            <div className={light? "authentication-cont light-img": "authentication-cont dark-img"}>
                <div className="login-auth-cont">
                    <h1>Sign Up</h1>
                    <div className={ message ? "message show": "message hide" }>
                        <p>{ message }</p>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" autoComplete="off" required placeholder="Username" name="username" className={light? "light":"dark"} />
                        <input type="email" autoComplete="off" required placeholder="Email" name="email" className={light? "light":"dark"} />
                        <input type="password" autoComplete="off" required placeholder="Password" name="password" className={light? "light":"dark"} />
                        <input type="password" autoComplete="off" required placeholder="Confirmation" name="password2" className={light? "light":"dark"} />
                        <button className={light? "auth light": "auth dark"}>Sign Up</button>
                    </form>
                    <p>Already have an account, <Link to="/login">Login</Link></p>
                </div>
            </div>
        </>
    )
}