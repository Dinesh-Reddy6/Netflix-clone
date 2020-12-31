import React,{useState,useEffect} from 'react'
//import axios from './axios.js'
import axios from 'axios';
import './Row.css'
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url="https://image.tmdb.org/t/p/w154";
//base url to fetch images from tmdb

function Row({title,fetchUrl,isLargeRow}) {

    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("");

    useEffect(() => {
        async function fetchData(){
           const result=await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
           //console.log(result);
           setMovies(result.data.results);
        }
    
    fetchData();
    }, [fetchUrl]);

    const opts={
        height:"300",
        width:"100%",
        playerVars:{
            autoplay:1,
            'origin': 'http://localhost:3000' 
        },
    }

    const handleClick=(movie)=>{
        //if video is playing close it,else if video is not playing and user clicked on movie- then play video.(like toggler)
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            movieTrailer(movie?.name|| movie?.original_name|| "")
            .then((url)=>{
                //we get complete youtube url: "https://www.youtube.com/watch?v=XhJURFJHmdgnVGNkU"
                //but we only want the parameter v from url i.e. XhJURFJHmdgnVGNkU
                const urlParams=new URLSearchParams(new URL(url).search);
                console.log(urlParams);
                setTrailerUrl(urlParams.get('v')); // getting v param
            })
            .catch((err)=>console.log("error movie: ",err));
        }
    }

    return (
        < div className="row">
            <h3>{title}</h3>
            <div className="row__posters">

                {movies.map(movie=>(
                    <img 
                    onClick={()=>handleClick(movie)}
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                ))}

            </div>

            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}  />}
        </div>
    )
}

export default Row
