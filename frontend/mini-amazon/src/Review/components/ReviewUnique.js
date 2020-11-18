import React, { useState } from 'react';
import placeholder from '../placeholder.png';
import picLocations from '../picLocations.js';
import { Button, Icon, Header, Card, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import { Image, Item } from 'semantic-ui-react'
import '../styles/sellingItem.css';
import FileUpload from './FileUpload';
import axios from 'axios';
import backend from "../../config"

function ReviewUnique(props) {
    const [editOpen, setEditOpen] = useState(false)

    const [rating_item, setRatingItem] = useState(props.review.rating_item)
    const [rating_storefront, setRatingStorefront] = useState(props.review.rating_storefront)
    const [review, setReview] = useState(props.review.review)

    const buyer_email = JSON.parse(sessionStorage.getItem('email'));

    const initialState = {
        rating_item: props.review.rating_item,
        rating_storefront: props.review.rating_storefront,
        review: props.review.review
    };

    function handleSubmit() {
        const data = {
            item_id: props.review.item_id,
            storefront_email: props.review.storefront_email,
            buyer_email: buyer_email,
            rating_item: rating_item,
            rating_storefront: rating_storefront,
            review: review
        }

        axios.put(backend + '/review/', data)
            .then((res) => {
                console.log(res);
                setEditOpen(false)
                setRatingItem(initialState.rating_item)
                setRatingStorefront(initialState.rating_storefront)
                setReview(initialState.review)
                window.location.reload();
            })
    }

    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.review.item_name}</Card.Header>
                <br />

                <div>
                    <div id='storefront_email'>
                        <Header sub>Sold by:</Header>
                        <span>{props.review.storefront_name}</span>
                    </div>

                    <div id='item_id'>
                        <Header sub>Item ID:</Header>
                        <span>{props.review.item_id}</span>
                    </div>
                </div>
            </Card.Content>
            <Card.Content textAlign='center'>
                <Modal
                    as={Form}
                    onSubmit={(() => handleSubmit())}
                    onClose={() => setEditOpen(false)}
                    onOpen={() => setEditOpen(true)}
                    open={editOpen}
                    trigger={
                        <Button color='grey' icon>
                            <Icon name='edit outline' />
                        </Button>
                    }
                    id='Semantic-Modal'
                >
                    <Modal.Header>Edit Review</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>Item Name: {props.review.item_name}</Header>
                            <Header>Seller Name: {props.review.storefront_name}</Header>
                        </Modal.Description>
                        <br/>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Item Rating (Only accepts integers 0-5!)</label>
                                <Input
                                    required
                                    label='*'
                                    placeholder='Item Rating'
                                    type='number'
                                    max='5'
                                    min='0'
                                    value={rating_item}
                                    onChange={e => setRatingItem(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Storefront Rating (Only accepts integers 0-5!)</label>
                                <input
                                    required
                                    label='*'
                                    placeholder='Storefront Rating'
                                    type='number'
                                    max='5'
                                    min='0'
                                    value={rating_storefront}
                                    onChange={e => setRatingStorefront(e.target.value)}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Review</label>
                            <TextArea
                                required
                                placeholder='Write a review.'
                                value={review}
                                onChange={e => setReview(e.target.value)}
                            />
                        </Form.Field>
                        <Button primary type='submit'>Submit</Button>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setEditOpen(false)}>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Card.Content>
        </Card >
    );
}
export default ReviewUnique;