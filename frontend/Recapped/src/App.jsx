import './App.css'
import NavBar from './components/navbar.jsx'
import HomePage from './components/homepage.jsx'
import {useState, useEffect} from 'react';

function App() {
  const [light, setLight] = useState(() => {
        const saved = localStorage.getItem("light");
        return saved ? JSON.parse(saved) : false; 
    });

    useEffect(() => {
        localStorage.setItem("light", JSON.stringify(light));
    }, [light]);

  return (
    <>
    <HomePage light={light} setLight={setLight} />
    </>
  );
}

export default App;
