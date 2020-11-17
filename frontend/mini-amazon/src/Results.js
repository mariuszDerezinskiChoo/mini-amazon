import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {Listings} from "./components/Listings";
import NavBar from './NavBar';
import backend from "./config"

function Results(props) {
    const [listings, setListings] = useState([]);
    
    console.log(props.match.params.search);

    useEffect( () => {
      fetch(backend + '/listings/' + props.match.params.search).then(response =>
        response.json().then(data => {
          setListings(data.listings);
        })
      );
    }, []);
  
    return (
      <div className= "App" >
          <NavBar/>
        <Listings listings= {listings} />
      </div>
    );
  }
  
  export default Results;