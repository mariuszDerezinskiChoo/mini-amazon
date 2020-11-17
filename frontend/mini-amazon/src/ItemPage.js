
import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {Items} from "./components/Items";
import backend from "./config"

function ItemPage(props) {
    const [items, setItems] = useState([]);
    
    console.log(props.match.params.item);

    useEffect( () => {
      fetch(backend + '/item/' + props.match.params.seller + "/" + props.match.params.id).then(response =>
        response.json().then(data => {
          setItems(data.items);
        })
      );
    }, []);
  
    return (
      <div className= "App" >
        <Items items= {items} />
      </div>
    );
  }
  
  export default ItemPage;