import './css/navbar.css'
import { Link } from "react-router-dom"
import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';


export default function NavBar({light, setLight, setGenre, setCtry, setYear, setSearch}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoverongen, setHoverongen ] = useState(false);
    const [hoveronctry, setHoveronctry] = useState(false);
    const [hoveronyr, setHoveronyr] = useState(false);
    const Token = sessionStorage.getItem("Token");
    const timer = useRef(null);
    const navigate = useNavigate();

    const GENRE_OPTIONS = [
        { value: "action", label: "Action" },
        { value: "horror", label: "Horror" },
        { value: "drama", label: "Drama" },
        { value: "adventure", label: "Adventure" },
        { value: "comedy", label: "Comedy" },
        { value: "crime", label: "Crime" },
        { value: "slasher", label: "Slasher" },
        { value: "western", label: "Western" },
        { value: "war", label: "War" },
        { value: "mystery", label: "Mystery" },
        { value: "romance", label: "Romance" },
        { value: "sci-fi", label: "Sci-fi" },
        { value: "documentary", label: "Documentary" },
        { value: "animation", label: "Animation" },
    ];

    const COUNTRY_OPTIONS = [
        { value: "United States", label: "United States" },
        { value: "India", label: "India" },
        { value: "United Kingdom", label: "United Kingdom" },
        { value: "Canada", label: "Canada" },
        { value: "Australia", label: "Australia" },
        { value: "Germany", label: "Germany" },
        { value: "France", label: "France" },
        { value: "Brazil", label: "Brazil" },
        { value: "Japan", label: "Japan" },
        { value: "South Korea", label: "South Korea" },
        { value: "Russia", label: "Russia" },
        { value: "Mexico", label: "Mexico" },
        { value: "Spain", label: "Spain" },
        { value: "Italy", label: "Italy" },
        { value: "Netherlands", label: "Netherlands" },
        { value: "Sweden", label: "Sweden" },
        { value: "Saudi Arabia", label: "Saudi Arabia" },
        { value: "United Arab Emirates", label: "United Arab Emirates" },
    ];

    const YEAR_OPTIONS = [];
    const startingYear = 1979;
    const currentYear = new Date().getFullYear();

    for (let y = startingYear; y <= currentYear; y++) {
        YEAR_OPTIONS.push({ value: String(y), label: String(y) });
    }

    useEffect(() => {
        document.body.className = light ? "lightmode": "darkmode";
    }, [light]); 


    function logout() {
        sessionStorage.clear();
        navigate("/");
        //console.log("Logged out");
    }

    function hideOptions(filter) {
        if (filter === "g") {
            timer.current = setTimeout(() => {
            setHoverongen(false);}, 500);
        }
         
        if (filter === "c") {
            timer.current = setTimeout(() => {
            setHoveronctry(false);}, 500);
        };
        if (filter === "y") {
            timer.current = setTimeout(() => {
            setHoveronyr(false);}, 500);
        };
    }

    function show(filter) {
        clearTimeout(timer.current);
        if (filter === "g") {setHoverongen(true)};
        if (filter === "c") {setHoveronctry(true)};
        if (filter === "y") {setHoveronyr(true)};
    }
    
    
    function handleSearch(e){
        e.preventDefault();
        const movieName = e.target.q.value;
        //console.log(movieName);
        setSearch(movieName);
        e.target.reset()
    }

    
    return (
        <>
        <div className={hoverongen? "filters-cont genres gen-visible": "filters-cont genres gen-hidden"} onMouseEnter={() => show("g")} onMouseLeave={() => hideOptions("g")}>
            {GENRE_OPTIONS.map((gen) => (
                <div className="single-filter-opt" key={gen.value} onClick={() => {
                    setGenre(gen.value);
                }}>
                    {gen.label}
                </div>
            ))}    
        </div>
   
        <div className={hoveronctry ? "filters-cont country country-visible": "filters-cont country country-hidden"} onMouseEnter={() => show("c")} onMouseLeave={() => hideOptions("c")}>
            {COUNTRY_OPTIONS.map((country) => (
                <div className="single-filter-opt" key={country.value} onClick={() => {
                    setGenre("");
                    setCtry(country.value);
                }}>
                    {country.label}
                </div>
            ))}     
        </div>

        <div className={hoveronyr ? "filters-cont yr yr-visible": "filters-cont yr yr-hidden"} onMouseEnter={() => show("y")} onMouseLeave={() => hideOptions("y")}>
            {YEAR_OPTIONS.map((year) => (
                <div className="single-filter-opt" key={year.value} onClick={() => {
                    setGenre("");
                    setCtry("");
                    setYear(year.value);
                }}>
                    {year.label}
                </div>
            ))}     
        </div>


        <nav>
            <div className={ light ? "navbar-cont lightmode": "navbar-cont darkmode"}>
                <a className={light? "logo-cont lightmode": "logo-cont darkmode"} href="/home">
                    <img src={light ? "/whiteLogo.png":"/blackLogo.png"} alt="logo" />
                </a>
                <div className="links-cont">
                    <div className={light? "search-bar light":"search-bar dark"}>
                        <form  onSubmit={(e) => {handleSearch(e)}}>
                            <input  required autoCapitalize="off" autoComplete="off" type="text" placeholder="Search Your Movie Here ..." name="q" />
                            <button className={light? "light": "dark"} type="submit">Search</button>
                        </form>
                    </div>

                    <div className={light? "links links-light":"links links-dark"}>
                        <a href="/home">Home</a>
                        <a className="genre"  onMouseOver={() => setHoverongen(true)} onMouseOut={() => {setHoverongen(false)}}>Genres</a>
                        <a className="country"  onMouseOver={() => setHoveronctry(true)} onMouseOut={() => {setHoveronctry(false)}}>Country</a>
                        <a className="year" onMouseOver={() => setHoveronyr(true)} onMouseOut={() => {setHoveronyr(false)}}>Year</a>
                    </div>
                </div>

                <div className="mode" onClick={() => {setLight(!light)}}>
                        <i className={light ? "bi bi-brightness-high-fill lightmode": "bi bi-moon-stars-fill darkmode"}></i>
                </div>

                <div className="humburger" onClick={() => {setMenuOpen(!menuOpen)}}>
                    <i className={menuOpen ? "bi bi-x-lg": "bi bi-list" }></i>
                </div>
                {
                    menuOpen ? (
                        <div className="menu-open">
                                <div className="auth logout-cont" onClick={() => {logout()}}>
                                    Logout
                                </div>  
                            </div>
                    ): ("")
                }
                <div className="user-cont">
                    <div className="auth logout-cont" onClick={() => {logout()}}>
                        Logout
                    </div>  
                </div>
   
            </div>
        </nav>  
        </>
    )
}