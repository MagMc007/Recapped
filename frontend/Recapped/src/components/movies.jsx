import './css/movies.css'
import api from '../api/axios.jsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// used category to signify series/ movie category

export default function Movies({ category, genre }) {
    const [loading, setLoading] = useState(true);
    const [ message, setMessage ] = useState("");
    const [ movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const Token = sessionStorage.getItem("Token");

    // save the genre here to do a callback
    useEffect(() => {
        const params = {"g":genre};
    }, [genre])

    useEffect(() => {
        async function fetchMovies() {
            let endpoint = "";
            try {
                if (genre) {
                     endpoint = category === "movies" ? "api/movies/filter/genre": "api/series/filter/genre";
                }
                else{
                     endpoint = category === "movies" ? "api/movies/": "api/series";
                }

                const response = await api.get(endpoint, {headers:{ Authorization: `Bearer ${Token}`}, params : genre ? { g: genre } : {}})
                //console.log(response);
                if (response){
                    setMovies(response.data.results);
                    //console.log(response.data.results);
                    setLoading(false);   
                }   
            } catch(error){
                console.log(error)
                setMessage("Sorry, Something went wrong")
            }
        }
        fetchMovies();
    }, [category, genre])

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
    //console.log("movies", movies)

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