import './css/movies.css'
import api from '../api/axios.jsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// used category to signify series/ movie category

export default function Movies({ category, genre, ctry, setCtry, setGenre, year, search, setSearch, setYear}) {
    const [loading, setLoading] = useState(true);
    const [ message, setMessage ] = useState("");
    const [ movies, setMovies] = useState();
    const navigate = useNavigate();
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    

    const Token = sessionStorage.getItem("Token");
    const fetchMovies = async (url = null) => {
            setLoading(true);
            let endpoint = "";
            let params = {};

            // determine URL or endpoint
            if (url != null) {
                const baseURL = "http://127.0.0.1:8000/"; 
                endpoint = url.startsWith(baseURL) ? url.slice(baseURL.length) : url;
            } else if (genre) {
                url = null;
                endpoint = category === "movies" ? "api/movies/filter/genre" : "api/series/filter/genre";
                params.g = genre;
                setCtry("");
            } else if (ctry) {
                url = null;
                endpoint = category === "movies" ? "api/movies/filter/country" : "api/series/filter/country";
                params.c = ctry;
                setGenre("");
            } else if (year) {
                url = null;
                endpoint = category === "movies" ? "api/movies/filter/year" : "api/series/filter/year";
                params.y = year;
                setGenre(""); setCtry(""); setSearch("");
            } else if (search) {
                url = null;
                endpoint = category === "movies" ? "api/movies/search" : "api/series/search";
                params.q = search;
                setGenre(""); setCtry(""); setYear("");
            } else {
                url = null;
                endpoint = category === "movies" ? "api/movies/" : "api/series/";
            }

            try {
                const response = await api.get(
                    endpoint, {
                    headers: { Authorization: `Bearer ${Token}` },
                    params
                });
                //console.log(response);
                setMovies(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setMessage("");
            } catch (error) {
                setMessage(error.response?.data?.message || "Error fetching movies");
            } finally {
                setLoading(false);
            }
            };


    useEffect(() => {
        fetchMovies();
    }, [category, genre, ctry, year, search]); 


    if (loading) {
        return (
            <>
                <div className="other-cont">
                    <div className="loader"></div>
                </div>
            </>
        )
    }

    if (message) {
        return (
            <>
                <div className="other-cont">
                    <p>{message}</p>
                </div>
            </>
        )
    }
    // console.log("movies", movies)

    function goToMovie(category, name) {
        navigate(`/${category}/${name}`)
    }

    return (
        <div>
            <div className="movies-cont">
                {
                    movies.map((item) => (
                        <div className="single-movie" key={item.id} onClick={() => goToMovie(category, item.name)}>
                            <div className="movie-img-cont">
                                <img src={item.poster_url} alt="image" />
                            </div>
                            <div className="movie-detail-cont">
                                <span>{item.name.slice(0,20)}</span>
                            </div>
                            <div className="adds ratings">
                                {item.average_rating ? "⭐" + item.average_rating.toFixed(1): "⭐-.-"} </div>
                            <div className="adds year">{item.year}</div>
                        </div>
                        )
                    )
                }
            </div>
            <div className="pagination-cont">
                <div>
                    <ul className="pagination">
                        <li className={`page-item ${!prevPage && "disabled"}`}>
                            <button className="page-link" onClick={() => prevPage && fetchMovies(prevPage)}>
                                Previous
                            </button>
                        </li>
                        <li className={`page-item ${!nextPage && "disabled"}`}>
                            <button className="page-link" onClick={() => nextPage && fetchMovies(nextPage)}>
                                Next
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}