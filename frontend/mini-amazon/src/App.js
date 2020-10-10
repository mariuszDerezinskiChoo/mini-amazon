import React from 'react';
import './App.css';
import SellingItem from './SellingItem.js';
import data from './dummyData.js';
import { Segment, Card } from 'semantic-ui-react'

function App() {
  const items = []

  for (const [index, value] of data.entries()) {
    items.push(<SellingItem key={index} item={value} />)
  }

  return (
    <Card.Group centered>
      {items}
    </Card.Group>
  );
}

export default App;
