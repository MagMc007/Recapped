import NavBar from './navbar.jsx'
import  Choices from './choices.jsx'
import './css/home.css'
import Movies from './movies.jsx'


export default function Home({ light, setLight}) {
    document.title = "Home";
    return (
        <>
            
            <NavBar light={light} setLight={setLight} />
            
            <div className="home-cont">
                <div className="home-choices">
                   <Choices />
                </div>
                <Movies />
            </div> 
        </>
    )
}