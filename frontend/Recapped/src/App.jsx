import './App.css'
import HomePage from './components/homepage.jsx'
import SignUp from './components/signup.jsx'
import Login from './components/login.jsx'
import Dummy from './components/dummy.jsx'
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

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
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage light={light} setLight={setLight} />}></Route>
        <Route path="/login" exact element={<Login light={light} setLight={setLight} />}></Route>
        <Route path="/signup" exact element={<SignUp  light={light} setLight={setLight} />}></Route>
        <Route path="/dummy" exact element={<Dummy  light={light} setLight={setLight} />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
