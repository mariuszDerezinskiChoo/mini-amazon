import React from 'react';
import '../App.css';
import ListedItems from '../Seller/components/ListedItems.js';
import AddItem from '../Seller/components/AddItem.js';

function Seller() {
  return (
    <div>
      <div id='add-modify'>
        <AddItem />
      </div>
      <br />
      <div id='item-list'>
        <ListedItems />
      </div>
    </div>
  );
}
export default Seller;