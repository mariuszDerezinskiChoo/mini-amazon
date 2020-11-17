import React, {Component, useEffect, useState} from 'react';
import './App.css';
import NavBar from './NavBar';
import {Home} from "./components/Home";
import backend from "./config"

function HomePage() {
    const [recs, setRecs] = useState([]);
    

    useEffect( () => {
      fetch(backend + '/home').then(response =>
        response.json().then(data => {
          setRecs(data.recs);
        })
      );
    }, []);

    return (
      <div className= "App" >
        <NavBar/>
        <Home recs= {recs} />
      </div>
    );
  }
  
  export default HomePage;