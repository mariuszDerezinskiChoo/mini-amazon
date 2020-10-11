import React from 'react';
import data from '../dummyData.js';
import { Segment, Card } from 'semantic-ui-react';
import SellingItem from './SellingItem.js';

function ListedItems() {
    const items = []

    for (const [index, value] of data.entries()) {
        items.push(<SellingItem key={index} item={value} />)
    }

    return (
        <Segment.Group>
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