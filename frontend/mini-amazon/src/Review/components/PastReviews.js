import React, { useState, useEffect } from 'react';
import { Segment, Card } from 'semantic-ui-react';
import ReviewUnique from './ReviewUnique.js';
import axios from 'axios';

function PastReviews() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/reviews')
            .then((res) => {
                const WrittenReviews = []
                for (const [index, value] of res.data.WrittenReviews.entries()) {
                    WrittenReviews.push(<ReviewUnique key={index} item={value} />)
                }
                setReviews(WrittenReviews)
            })
    }, [])

    return (
        <Segment.Group raised>
            <Segment><h2>Your Past Reviews</h2></Segment>
            <Segment>
                <Card.Group centered>
                    {reviews}
                </Card.Group>
            </Segment>
        </Segment.Group>
    )
}
export default PastReviews;