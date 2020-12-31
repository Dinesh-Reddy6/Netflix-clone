import React,{useState,useEffect} from 'react'
import requests from './requests.js'
import axios from 'axios';
import './Banner.css'

function Banner() {
    const [randMovie,setRandMovie]=useState([]);

    useEffect(() => {
        async function fetchData(){
           const result=await axios.get(`https://api.themoviedb.org/3${requests.fetchNetflixOrginals}`);
           console.log(result);
           setRandMovie(result.data.results[Math.floor( Math.random()*result.data.results.length-1 )]);
           //console.log(randMovie);
           //getting random movie
        }
    
    fetchData();
    }, []);

    function truncate(str,n){
        return str?.length>n ? str.substr(0,n-1)+"..." : str;
    }
    
    return (
        <header className="banner"
         style={{
             backgroundSize:"cover",
             backgroundImage:`url("https://image.tmdb.org/t/p/original/${randMovie?randMovie.backdrop_path:""}")`, 
             backgroundPosition:"center center", }}
        >
            <div className="banner__contents">
                  <h2 className="banner_title">{randMovie?.title || randMovie?.name || randMovie?.original_name }</h2>
                  <div className="banner__buttons">
                      <button className="banner_button">Play</button>
                      <button className="banner_button">My List</button> 
                  </div>
                  <h1 className="banner_description">{truncate(randMovie?.overview,150)}</h1> {/*if description is more we put ...*/}
            </div>

        </header>
    )
}

export default Banner
