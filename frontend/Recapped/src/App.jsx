import './App.css'
import HomePage from './components/homepage.jsx'
import SignUp from './components/signup.jsx'
import Login from './components/login.jsx'
import Home from './components/home.jsx'
import MovieDetail from './components/movieDetail.jsx'
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

// this is to manipulate genres into fetching movies of some genre

function ProtectRoute({children}){
  const Token = sessionStorage.getItem("Token");

  if (!Token) {
      return <Navigate to="/login" replace />
  }

  return children

}


function App() {
  // filters lifted one stage up
  const [genre, setGenre] = useState("");
  const [ctry, setCtry] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  // ----------------------------------

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

       {/* protected Routes */}
        <Route path="/home" exact element=
        {
          <ProtectRoute>
                <Home light={light} setLight={setLight} genre={genre} setGenre={setGenre} setCtry={setCtry} ctry={ctry} year={year} setYear={setYear} search={search} setSearch={setSearch}/>
          </ProtectRoute>
          }
        />
        <Route path="/:category/:name" exact element=
        {
          <ProtectRoute>
            <MovieDetail light={light} setLight={setLight} />
          </ProtectRoute>
        }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
