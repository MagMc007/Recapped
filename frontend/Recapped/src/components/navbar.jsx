import './css/navbar.css'
import { Link } from "react-router-dom"
import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom'


export default function NavBar({light, setLight, setGenre, setCtry}) {
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

    const YEAR_OPTIONS = [
        { value: "1979", label: "1979" }, { value: "1980", label: "1980" }, { value: "1981", label: "1981" },
        { value: "1982", label: "1982" }, { value: "1983", label: "1983" }, { value: "1984", label: "1984" },
        { value: "1985", label: "1985" }, { value: "1986", label: "1986" }, { value: "1987", label: "1987" },
        { value: "1988", label: "1988" }, { value: "1989", label: "1989" }, { value: "1990", label: "1990" },
        { value: "1991", label: "1991" }, { value: "1992", label: "1992" }, { value: "1993", label: "1993" },
        { value: "1994", label: "1994" }, { value: "1995", label: "1995" }, { value: "1996", label: "1996" },
        { value: "1997", label: "1997" }, { value: "1998", label: "1998" }, { value: "1999", label: "1999" },
        { value: "2000", label: "2000" }, { value: "2001", label: "2001" }, { value: "2002", label: "2002" },
        { value: "2003", label: "2003" }, { value: "2004", label: "2004" }, { value: "2005", label: "2005" },
        { value: "2006", label: "2006" }, { value: "2007", label: "2007" }, { value: "2008", label: "2008" },
        { value: "2009", label: "2009" }, { value: "2010", label: "2010" }, { value: "2011", label: "2011" },
        { value: "2012", label: "2012" }, { value: "2013", label: "2013" }, { value: "2014", label: "2014" },
        { value: "2015", label: "2015" }, { value: "2016", label: "2016" }, { value: "2017", label: "2017" },
        { value: "2018", label: "2018" }, { value: "2019", label: "2019" }, { value: "2020", label: "2020" },
        { value: "2021", label: "2021" }, { value: "2022", label: "2022" }, { value: "2023", label: "2023" },
        { value: "2024", label: "2024" }, { value: "2025", label: "2025" }
    ];

    useEffect(() => {
        document.body.className = light ? "lightmode": "darkmode"
    }, [light]); 


    function logout() {
        sessionStorage.clear();
        navigate("/");
        console.log("Logged out");
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
                    setCtry(year.value);
                }}>
                    {year.label}
                </div>
            ))}     
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

                    <div className={light? "links links-light":"links links-dark"}>
                        <a href="/home">Home</a>
                        <a className="genre"  onMouseOver={() => setHoverongen(true)} onMouseOut={() => {setHoverongen(false)}}>Genres</a>
                        <a className="country"  onMouseOver={() => setHoveronctry(true)} onMouseOut={() => {setHoveronctry(false)}}>Country</a>
                        <a className="year" onMouseOver={() => setHoveronyr(true)} onMouseOut={() => {setHoveronyr(false)}}>Year</a>
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