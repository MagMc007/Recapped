//import {Link} from 'react-router-dom'
import './css/choices.css'


export default function Choices({ onSelect, choice }) {
    return (
        <>
            <div className="choices-cont">
                <div className={choice === "movies" ? "choice movies selected":"choice movies"} onClick={() => {onSelect("movies");window.location.reload()}}>
                    <p>Movies</p>
                </div>
                <div className={choice === "series" ? "choice series selected":"choice series"} onClick={() => {onSelect("series");}}>
                    <p>Series</p>
                </div>
            </div>
        </>
    )
}