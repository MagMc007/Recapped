import NavBar from './navbar.jsx'
import './css/home.css'


export default function Home({ light, setLight}) {
    document.title = "Home";
    const username = sessionStorage.getItem("Username")
    return (
        <>
            <NavBar light={light} setLight={setLight} />
            <div className="home-cont">
                <h1>This is Home page</h1>
                <h2>Welcome {username}</h2>
            </div> 
        </>
    )
}