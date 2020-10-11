import React from 'react';
import './App.css';
import ListedItems from './Seller/components/ListedItems.js';
import AddModifyItem from './Seller/components/AddModifyItem.js';

function App() {
  return (
    <div>
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

export default App;
