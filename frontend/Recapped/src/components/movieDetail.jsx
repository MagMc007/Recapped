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

    // get the category and name 
    const path = window.location.pathname;
    const parts = path.split("/").filter(Boolean);
    const [category, name] = parts;

    //change the title
    const title = name.split("%20").join(" ")
    document.title = title;

    const [loading, setLoading] = useState(true);
    const [ message, setMessage ] = useState("");
    const [ movie, setMovie] = useState([]);
    // manip youtube to dislay different YT 
    const [currentVid, setCurrentVid] = useState("");

    const Token = sessionStorage.getItem("Token");

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await api.get(`api/${category}/${name}`, {headers:{ Authorization: `Bearer ${Token}`}})
                console.log(response);
                if (response){
                    setMovie(response.data);
                    setCurrentVid(response.data.youtube_details[0].video_id);
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
                <NavBar light={light} setLight={setLight} />
                <div className="other-cont">
                    <div className="loader"></div>
                </div>
            </>
        )
    }

    if (message) {
        return (
            <>
                <NavBar light={light} setLight={setLight} />
                <div className="other-cont">
                    <p>{message}</p>
                </div>
            </>
        )
    }

    //console.log(movie.youtube_details.slice(1));
    

    return ( 
        <>
        <NavBar light={light} setLight={setLight} />
        <div className="detail-movie-cont">
            <div className="video-cont">
                <div className="video">
                     <YouTube videoId={currentVid} opts={opts}/> 
                </div>
            </div>
            <div className="detail-exp-cont">
                <div className="movie-img-cont">
                     <img src={movie.poster_url} alt="" /> 
                </div>
                <div className="detail-movie">
                    <h5>{movie.name}</h5>
                    <hr />
                    <p>Country: {movie.country}</p>
                    <p>Genre: {movie.genre.name.toUpperCase()}</p>
                    <p>Year: {movie.year}</p>
                    <p>Average Rating: {movie.average_rating ? movie.average_rating: "_"}</p>
                    <div className="options">
                        <p>Sources: </p>
                        {
                            movie.youtube_details.map((source) => (
                                <div className="single-option" 
                                    onClick={() => setCurrentVid(source.video_id)}
                                    key={source.id}
                                    >
                                        <span>{source.source_channel}</span>
                                </div>
                                )
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}