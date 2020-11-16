import React, {Component, useEffect, useState} from 'react';
import './App.css';
import NavBar from './NavBar';
import {Home} from "./components/Home";

function HomePage() {
    const [recs, setRecs] = useState(null);
    

    useEffect( () => {
      fetch('http://127.0.0.1:5000/home').then(response =>
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