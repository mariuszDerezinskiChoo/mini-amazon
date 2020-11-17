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
    const [delOpen, setDelOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)

    // const [item_name, setItem_Name] = useState(props.review.item_name)
    const [item_id, setItemID] = useState(props.review.item_id)
    const [storefront_email, setStorefrontEmail] = useState(props.review.storefront_email)
    // const [buyer_email, setBuyerEmail] = useState(props.review.buyer_email)
    const [rating_item, setRatingItem] = useState(props.review.rating_item)
    const [rating_storefront, setRatingStorefront] = useState(props.review.rating_storefront)
    const [review, setReview] = useState(props.review.review)

    const buyer_email = JSON.parse(sessionStorage.getItem('email'));
    // console.log(localBuyerEmail);

    const initialState = {
        // item_name: props.review.item_name,
        item_id: props.review.item_id,
        storefront_email: props.review.storefront_email,
        // buyer_email: props.review.buyer_email,
        rating_item: props.review.rating_item,
        rating_storefront: props.review.rating_storefront,
        review: props.review.review
    };

    function handleSubmit() {
        const data = {
            // item_name: props.review.item_name,
            item_id: item_id,
            storefront_email: storefront_email,
            buyer_email: buyer_email,
            rating_item: rating_item,
            rating_storefront: rating_storefront,
            review: review
        }

        // axios.put(backend + '/review', data)
        axios.put(backend + '/review', data)
            .then((res) => {
                console.log(res);
            })

        setEditOpen(false)
        setItemID(initialState.item_id)
        setStorefrontEmail(initialState.storefront_email)
        // setBuyerEmail(initialState.buyer_email)
        setRatingItem(initialState.rating_item)
        setRatingStorefront(initialState.rating_storefront)
        setReview(initialState.review)
    }

    // function handleDelete() {
    //     const data = {
    //         item_id: props.review.item_id,
    //         storefront_email: props.review.storefront_email,
    //         buyer_email: props.review.buyer_email,
    //     }
    //     // axios.post(backend + '/delete_review', data)
    //     axios.post('http://127.0.0.1:5000/delete_review', data)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //     setDelOpen(false)
    //     window.location.reload();
    // }

    return (
        // <Item>
        // <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
    
        //     <Item.Content>
        //         <Item.Header as='a'>Header</Item.Header>
        //         <Item.Meta>Description</Item.Meta>
        //         <Item.Description>asdf
        //         </Item.Description>
        //         <Item.Extra>Additional Details</Item.Extra>
        //     </Item.Content>
        // </Item>
    
        <Card>
            {/* <img
                src={location}
                height={400}
                alt={placeholder}
            /> */}

            <Card.Content>
                <Card.Header>{props.review.item_name}</Card.Header>
                <br />

                <div>
                    <div id='storefront_email'>
                        <Header sub>Sold by:</Header>
                        <span>{props.review.storefront_email}</span>
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
                        <Form.Field>
                            <label>Item ID (You cannot change this!)</label>
                            <input
                                required
                                placeholder='Item ID'
                                type='number'
                                value={props.review.item_id}
                                // onChange={e => setItemID(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Storefront Email (You cannot change this!)</label>
                            <input
                                required
                                placeholder='Who sold you this item?'
                                value={props.review.storefront_email}
                                // onChange={e => setStorefrontEmail(e.target.value)}
                            />
                        </Form.Field>
                        {/* <Form.Field>
                            <label>Buyer Email (You cannot change this!)</label>
                            <input
                                required
                                placeholder='What is your email?'
                                value={props.review.buyer_email}
                                // onChange={e => setBuyerEmail(e.target.value)}
                            />
                        </Form.Field> */}
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
                        {/* <Form.Field>
                            <label>Date/Time Submitted</label>
                            <TextArea
                                required
                                placeholder='Date/Time'
                                value={datetime}
                                onChange={e => setDatetime(e.target.value)}
                            />
                        </Form.Field> */}
                        <Button primary type='submit'>Submit</Button>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setEditOpen(false)}>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>

                {/* <Modal
                    onClose={() => setDelOpen(false)}
                    onOpen={() => setDelOpen(true)}
                    open={delOpen}
                    trigger={
                        <Button color='red' icon>
                            <Icon name='trash alternate outline' />
                        </Button>
                    }
                    id='Semantic-Modal'
                >
                    <Modal.Header>Delete Review</Modal.Header>
                    <Modal.Content>
                        Are you sure you want to delete this review? This cannot be undone!
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setDelOpen(false)}>
                            Cancel
                        </Button>
                        <Button color='red' onClick={() => setDelOpen(false)}>
                            Delete
                        </Button>
                    </Modal.Actions>
                </Modal> */}
            </Card.Content>
        </Card >
    );
}
export default ReviewUnique;