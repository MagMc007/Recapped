import NavBar from './navbar.jsx'
import  Choices from './choices.jsx'
import './css/home.css'
import Movies from './movies.jsx'
import { useState } from 'react'


export default function Home({ light, setLight}) {
    document.title = "Home";
    const [selected, setSelected] = useState("movies");

    return (
        <>
            <NavBar light={light} setLight={setLight} />
            
            <div className="home-cont">
                <div className="home-choices">
                   <Choices onSelect={setSelected} choice={selected} />
                </div>
                <Movies category={selected}/>
            </div> 
        </>
    )
}