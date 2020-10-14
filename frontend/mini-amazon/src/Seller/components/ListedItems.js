import React, { useEffect } from 'react';
import data from '../dummyData.js';
import { Segment, Card } from 'semantic-ui-react';
import SellingItem from './SellingItem.js';
import axios from 'axios';

function ListedItems() {
    const items = []

    for (const [index, value] of data.entries()) {
        items.push(<SellingItem key={index} item={value} />)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/seller')
            .then((res) => {
                console.log(res);
            })
    })

    return (
        <Segment.Group raised>
            <Segment><h2>Your Listed Items</h2></Segment>
            <Segment>
                <Card.Group centered>
                    {items}
                </Card.Group>
            </Segment>
        </Segment.Group>
    )
}
export default ListedItems;