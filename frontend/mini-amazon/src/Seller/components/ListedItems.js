import React, { useState, useEffect } from 'react';
import { Segment, Card } from 'semantic-ui-react';
import SellingItem from './SellingItem.js';
import axios from 'axios';

function ListedItems() {
    const [items, setItems] = useState([])

    const email = JSON.parse(sessionStorage.getItem('email'));

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/seller/' + email)
            .then((res) => {
                const listings = []
                for (const [index, value] of res.data.listings.entries()) {
                    listings.push(<SellingItem key={index} item={value} />)
                }
                setItems(listings)
            })
    }, [])

    return (
        <Segment.Group raised>
            <Segment><h2>Your Listed Items</h2></Segment>
            <Segment style={{overflow: 'auto', maxHeight: '80vh' }}>
                <Card.Group centered>
                    {items}
                </Card.Group>
            </Segment>
        </Segment.Group>
    )
}
export default ListedItems;

