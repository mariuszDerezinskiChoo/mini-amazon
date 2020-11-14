import React, { useState, useEffect } from 'react';
import { Segment, Card, Item } from 'semantic-ui-react';
import ReviewUnique from './ReviewUnique.js';
import axios from 'axios';

function PastReviews() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/review')
            .then((res) => {
                const list = []
                for (const [index, value] of res.data.reviews_endpt.entries()) {
                    list.push(<ReviewUnique key={index} review={value} />) // Is "item" react's term?
                }
                setReviews(list)
            })
    }, [])

    return (
        <Segment.Group raised>
            <Segment><h2>Your Past Reviews</h2></Segment>
            <Segment style={{overflow: 'auto', maxHeight: '80vh' }}>
                
                {/* <Item.Group centered>
                    {reviews}
                </Item.Group> */}

                <Card.Group centered>
                    {reviews}
                </Card.Group>

            </Segment>
        </Segment.Group>
    )
}
export default PastReviews;