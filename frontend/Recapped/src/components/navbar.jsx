import './css/navbar.css'
// import { Link } from "react-router-dom"


export default function NavBar() {
    return (
        <>
        <nav>
            <div className="navbar-cont">
                <div className="logo-cont">
                    <img src="blackLogo.png" alt="logo" />
                </div>
                <div className="links-cont">
                    <div className="links">
                        <a>Home</a>
                        <a>Geners</a>
                        <a>Country</a>
                        <a>Year</a>
                    </div>
                    <div className="search-bar">
                        <form action="">
                            <input type="text" placeholder="Search Your Movie Here ..." />
                            <button>Search</button>
                        </form>
                    </div>
                </div>
                <div className="user-cont">
                    <div className="mode"></div>
                    <div className="login-cont">
                        Login
                    </div>
                    <div className="signup-cont">
                        Sign Up
                    </div>
                </div>
            </div>
        </nav>  
        </>
    )
}