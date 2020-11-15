import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {Listings} from "./components/Listings";
import NavBar from './NavBar';

function Results(props) {
    const [listings, setListings] = useState([]);
    
    console.log(props.match.params.search);

    useEffect( () => {
      fetch('http://127.0.0.1:5000/listings/' + props.match.params.search).then(response =>
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