import React from 'react';
import '../App.css';
import ListedItems from '../Seller/components/ListedItems.js';
import AddModifyItem from '../Seller/components/AddModifyItem.js';
import NavBar from '../NavBar';

function Seller() {
  return (
    <div>
      <NavBar/>
      <div id='add-modify'>
        <AddModifyItem />
      </div>
      <br />
      <div id='item-list'>
        <ListedItems />
      </div>
    </div>
  );
}
export default Seller;