import './css/movieDetail.css'
import NavBar from './navbar.jsx'
import YouTube from "react-youtube"

export default function MovieDetail({ light, setLight}) {
    const opts = {
        height: "400",
        width: "640",
        playerVars: { autoplay: 0 },
    };
    return (
        <>
        <NavBar light={light} setLight={setLight} />
        <div className="detail-movie-cont">
            <div className="video-cont">
                <div className="video">
                    <YouTube videoId="GE6WKfIrmks" opts={opts}/>
                </div>
            </div>
            <div className="detail-exp-cont">
                <div className="movie-img-cont">
                    <img src="https://m.media-amazon.com/images/M/MV5BOTA1Mzc2N2ItZWRiNS00MjQzLTlmZDQtMjU0NmY1YWRkMGQ4XkEyXkFqcGc@._V1_SX300.jpg" alt="" />
                </div>
                <div className="detail-movie">

                </div>
            </div>
        </div>
        </>
    )
}