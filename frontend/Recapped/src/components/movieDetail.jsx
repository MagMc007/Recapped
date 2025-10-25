import './css/movieDetail.css'
import NavBar from './navbar.jsx'
import YouTube from "react-youtube"
import { useState, useEffect } from 'react'
import api from '../api/axios.jsx'

export default function MovieDetail({ light, setLight}) {
    const opts = {
        height: "400",
        width: "640",
        playerVars: { autoplay: 0 },
    };

    const [loading, setLoading] = useState(true);
    const [ message, setMessage ] = useState("");
    const [ movie, setMovie] = useState([]);

    const Token = sessionStorage.getItem("Token");

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await api.get("api/series/You/", {headers:{ Authorization: `Bearer ${Token}`}})
                console.log(response);
                if (response){
                    setMovie(response.data);
                    //console.log(response.data.results);
                    setLoading(false);   
                }   
            } catch(error){
                console.log(error)
                setMessage("Sorry, Something went wrong")
            }
        }
        fetchMovie();
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
        <NavBar light={light} setLight={setLight} />
        <div className="detail-movie-cont">
            <div className="video-cont">
                <div className="video">
                     <YouTube videoId={movie.youtube_details[1].video_id} opts={opts}/> 
                </div>
            </div>
            <div className="detail-exp-cont">
                <div className="movie-img-cont">
                     <img src={movie.poster_url} alt="" /> 
                </div>
                <div className="detail-movie">
                    <h5>{movie.name}</h5>
                    <hr />
                    <h6>Country: {movie.country}</h6>
                    <h6>Genre: {movie.genre.name.toUpperCase()}</h6>
                    <h6>Year: {movie.year}</h6>
                    <h6>Average Rating: {movie.average_rating ? movie.average_rating: "_"}</h6>
                </div>
            </div>
        </div>
        </>
    )
}