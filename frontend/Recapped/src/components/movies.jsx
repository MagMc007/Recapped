import './css/movies.css'
import api from '../api/axios.jsx'
import { useState, useEffect } from 'react'


export default function Movies() {
    const [loading, setLoading] = useState(true);
    const [ message, setMessage ] = useState("");
    const [ movies, setMovies] = useState([]);

    const Token = sessionStorage.getItem("Token");

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await api.get("api/movies/", {headers:{ Authorization: `Bearer ${Token}`}})
                console.log(response);
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
    }, [])

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

    return (
        <>
            <div className="movies-cont">
                {  
                movies.map((item) => (
                    <div className="single-movie" id={item.id}>
                        <div className="movie-img-cont">
                            <img src={item.poster_url} alt="image" />
                        </div>
                        <div className="movie-detail-cont">
                            <span>{item.name}</span>
                        </div>
                    </div>
                )
                )
            }
            </div>

        </>
    )
}