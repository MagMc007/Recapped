import './css/navbar.css'
// import { Link } from "react-router-dom"
import {useState, useEffect} from 'react';


export default function NavBar({light, setLight}) {
    const [menuOpen, setMenuOpen] = useState(false);

    

    useEffect(() => {
        document.body.className = light ? "lightmode": "darkmode"
    })

    return (
        <>
        <nav>
            <div className={ light ? "navbar-cont lightmode": "navbar-cont darkmode"}>
                <div className="logo-cont">
                    <img src={light ? "whiteLogo.png":"blackLogo.png"} alt="logo" />
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
                        <a>Geners</a>
                        <a>Country</a>
                        <a>Year</a>
                    </div>
                    
                </div>
                
                <div className="mode" onClick={() => {setLight(!light);}}>
                        <i className={light ? "bi bi-toggle-off lightmode": "bi bi-toggle-on darkmode"}></i>
                        <span>{light? "light": "dark"}</span>
                </div>

                <div className="humburger" onClick={() => {setMenuOpen(!menuOpen)}}>
                    <i className={menuOpen ? "bi bi-x-lg": "bi bi-list" }></i>
                </div>

                {
                    menuOpen ? (
                        <div className="menu-open">
                            <div className="auth login-cont">
                                Login
                            </div>
                            <div className="auth signup-cont">
                                Sign Up
                            </div>
                        </div>
                    ): ("")
                }
                

                <div className="user-cont">
                    
                    <div className="auth login-cont">
                        Login
                    </div>
                    <div className="auth signup-cont">
                        Sign Up
                    </div>
                </div>
            </div>
        </nav>  
        </>
    )
}