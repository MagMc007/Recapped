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
    

    const Token = sessionStorage.getItem("Token");


    useEffect(() => {
        async function fetchMovies() {
            let endpoint = "";
            let params = {};

            // get the correct endpoint and the params based on the active filter
            if (genre) {
                endpoint = category === "movies" ? "api/movies/filter/genre" : "api/series/filter/genre";
                params.g = genre;
                setCtry("");
                //console.log(params)   
            } else if (ctry) {
                endpoint = category === "movies" ? "api/movies/filter/country" : "api/series/filter/country";
                params.c = ctry;
                setGenre("");
                //console.log(params)
            } else if (year) {
                endpoint = category === "movies" ? "api/movies/filter/year" : "api/series/filter/year";
                params.y = year;
                setGenre("");
                setCtry("");
                setSearch("");
                //console.log(params)
            } else if (search) {
                endpoint = category === "movies" ? "api/movies/search" : "api/series/search";
                params.q = search;
                setGenre("");
                setCtry("");
                setYear("");
                console.log(params)
            } else {
                endpoint = category === "movies" ? "api/movies/" : "api/series/";
                //console.log(params)
            }
            //console.log("genre:", genre, "ctry:", ctry, typeof ctry);

            //console.log(endpoint);

            try {
                const response = await api.get(endpoint, {
                    headers: { Authorization: `Bearer ${Token}`},
                    params
                });

                setMovies(response.data.results);
                setMessage("");
                setLoading(false);
            } catch (error) {
                setMessage(error.response?.data?.message || "Error fetching movies");
            }
        }

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
        <>
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
                    </div>
                )
                )
            }
            </div>
        </>
    )
}