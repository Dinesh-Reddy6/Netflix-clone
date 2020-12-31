import React,{useState,useEffect} from 'react'
import './App.css';
import Row from './Row.js'
import requests from './requests.js'
import Banner from './Banner.js'
import Nav from './Nav'
import './Nav.css'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

//API Key  3d4f9629c028cf682325dda9c9ef5ebd
// API Request  https://api.themoviedb.org/3/movie/550?api_key=3d4f9629c028cf682325dda9c9ef5ebd

firebase.initializeApp({
  apiKey:"AIzaSyAZVyoI8Cm4f6iHj7x4TQrmP0kRve24w_c",
  authDomain:"netflix-b61be.firebaseapp.com",
  projectId: "netflix-b61be",
  storageBucket: "netflix-b61be.appspot.com",
  messagingSenderId: "33119603976",
  appId: "1:33119603976:web:c9d52e55e35ff6f23bf0bd",
  measurementId: "G-QQXGQJQB9Z"
})

function App() {

  const toggle=()=>{
    setUser(null);
  }

  const [user,setUser]=useState(null);

 /* uiConfig = ({
    signInFlow:"popup",
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks:{
      signInSucess:()=>false //do nothing
    }
  })*/
  var provider = new firebase.auth.GoogleAuthProvider();

    const handle=() => {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      setUser(result);
    })
    }

  return (
 
    <div className="App">
      
      { !user ? (
        <div className="login" >
          <h1 style={{color:"red",margin:"20px"}}>NETFLIX</h1>
           <button onClick={handle}>SIGNIN WITH GOOGLE</button>
       </div>
      ):(
        <React.Fragment>
          <button style={{fontSize:"20px",backgroundColor:"white",color:"black",padding:"3px",borderRadius:"2px",marginLeft:"10px",marginTop:"3px"}} onClick={()=> setUser(null) }>signout</button>
          <Nav/>
          <Banner/>
          <Row title="NetflixOrginals" fetchUrl={requests.fetchNetflixOrginals} isLargeRow/> 
          /*the size of 1st row is large than other rows*/ 
          <Row title="Trending" fetchUrl={requests.fetchTrending}/>
          <Row title="TopRated" fetchUrl={requests.fetchTopRated}/>
          <Row title="ActionMovie" fetchUrl={requests.fetchActionMovies}/>
          <Row title="ComedyMovies" fetchUrl={requests.fetchComedyMovies}/>
          <Row title="HorrorMovies" fetchUrl={requests.fetchHorrorMovies}/>
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>      
      </React.Fragment>
      )
    }

    </div> 
  );
}

export default App;
