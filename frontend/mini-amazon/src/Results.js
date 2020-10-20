import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {Listings} from "./components/Listings";

function Results(props) {
    const [listings, setListings] = useState([]);
    
    console.log(props.match.params.search);

    useEffect( () => {
      fetch('/listings').then(response =>
        response.json().then(data => {
          setListings(data.listings);
        })
      );
    }, []);
  
    return (
      <div className= "App" >
        <Listings listings= {listings} />
      </div>
    );
  }
  
  export default Results;