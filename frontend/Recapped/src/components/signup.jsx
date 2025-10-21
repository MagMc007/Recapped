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
    const [showing, setShowing] =  useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password2 = e.target.password2.value;


        const formData = { username, email, password};
        if (password !== password2) {
            setMessage("Passwords must match");
        } else {
            // try sending the data
            try {
                const response = await api.post("api/auth/register/", formData);
                console.log(response);
                navigate("/dummy")
            } catch (error) {
                //console.log(error.response.data["username"][0]);
                setMessage(error.response.data["username"][0])
            }finally {
                e.target.reset();
                
            }
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
                        <div className="show-pwd">
                            <input type={showing ? "text": "password"} autoComplete="off" required placeholder="Password" name="password" className={light? "light":"dark"} id="no border" />
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