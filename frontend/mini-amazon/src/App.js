import React from 'react';
import './App.css';
import ListedItems from './Seller/components/ListedItems.js';
import AddModifyItem from './Seller/components/AddModifyItem.js';

function App() {
  return (
    <div>
      <AddModifyItem />
      <ListedItems />
    </div>
  );
}

export default App;
