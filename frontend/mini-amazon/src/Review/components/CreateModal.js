import React, { useState } from 'react';
import { Button, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import FileUpload from './FileUpload';
import axios from 'axios';
import backend from "../../config"

function CreateModal(props) {
    const [open, setOpen] = useState(false)
    const [rating_item, setRatingItem] = useState("")
    const [rating_storefront, setRatingStorefront] = useState("")
    const [review, setReview] = useState("")

    const buyer_email = JSON.parse(sessionStorage.getItem('email'));

    const initialState = {
        open: false,
        rating_item: "",
        rating_storefront: "",
        review: "",
    };

    function handleSubmit() {
        const data = {
            item_id: props.item_id,
            storefront_email: props.selleremail,
            buyer_email: buyer_email,
            rating_item: rating_item,
            rating_storefront: rating_storefront,
            review: review,
        }
        axios.post(backend + '/review/', data)
            .then((res) => {
                console.log(res);
                console.log(res.status);
            })
        setOpen(initialState.open)
        setRatingItem(initialState.rating_item)
        setRatingStorefront(initialState.rating_storefront)
        setReview(initialState.review)
        window.location.reload();
    }

    return (
        <Modal
            as={Form}
            onSubmit={(() => handleSubmit())}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Create New Review</Button>}
            id='Semantic-Modal'
        >
            <Modal.Header>Add New Review</Modal.Header>
            <Modal.Content>
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
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
export default CreateModal;