import './css/navbar.css'
import { Link } from "react-router-dom"
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'


export default function NavBar({light, setLight}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveron, setHoveron ] = useState(true);
    const Token = sessionStorage.getItem("Token");
    const navigate = useNavigate();


    useEffect(() => {
        document.body.className = light ? "lightmode": "darkmode"
    }) 

    function logout() {
        sessionStorage.clear();
        navigate("/");
        console.log("Logged out");
    }
    
    return (
        <>
        <div className={hoveron? "filters-cont genres visible": "filters-cont genres hidden"}>
                        hello there
        </div>
        <nav>
            <div className={ light ? "navbar-cont lightmode": "navbar-cont darkmode"}>
                <div className="logo-cont">
                    <img src={light ? "/whiteLogo.png":"/blackLogo.png"} alt="logo" />
                </div>
                <div className="links-cont">
                    <div className={light? "search-bar light":"search-bar dark"}>
                        <form action="">
                            <input  autoCapitalize="off" autoComplete="off" type="text" placeholder="Search Your Movie Here ..." name="q" />
                            <button className={light? "light": "dark"}>Search</button>
                        </form>
                    </div>

                    <div className="links">
                        <a>Home</a>
                        <a className="genre">Genres</a>
                        <a>Country</a>
                        <a>Year</a>
                    </div>
                </div>



                <div className="mode" onClick={() => {setLight(!light)}}>
                        <i className={light ? "bi bi-toggle-off lightmode": "bi bi-toggle-on darkmode"}></i>
                        <span>{light? "light": "dark"}</span>
                </div>

                <div className="humburger" onClick={() => {setMenuOpen(!menuOpen)}}>
                    <i className={menuOpen ? "bi bi-x-lg": "bi bi-list" }></i>
                </div>
                {
                    menuOpen ? (
                        Token ? (
                            <div className="menu-open">
                                <div className="auth logout-cont" onClick={() => {logout()}}>
                                    Logout
                                </div>  
                            </div>
                        ):(
                        <div className="menu-open">
                            <Link to="/login" className="auth login-cont">
                                Login
                            </Link>
                            <Link to="/signup" className="auth signup-cont">
                                Sign Up
                            </Link>
                        </div>)
                    ): ("")
                }

                {
                    Token ? (
                        <div className="user-cont">
                            <div className="auth logout-cont" onClick={() => {logout()}}>
                                Logout
                            </div>  
                        </div>
                    ): (
                        <div className="user-cont">
                            <Link to="/login" className={light? "auth login-cont light": "auth login-cont dark"}>
                                Login
                            </Link>
                            <Link to="/signup" className={light? "auth signup-cont light": "auth signup-cont dark"}>
                                Sign Up
                            </Link>
                        </div>
                    )
                }
                
            </div>
        </nav>  
        </>
    )
}