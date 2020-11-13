import React, { useState } from 'react';
import { Button, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import FileUpload from './FileUpload';
import axios from 'axios';

function CreateModal() {
    const [open, setOpen] = useState(false)

    // Ideally, these 3 attributes are automatically prepared when user clicks on the purchase history tuple he wants to review
    // Right now, anyone can write anything; at least check if user is logged in?
    const [item_id, setItemID] = useState("")
    const [storefront_email, setStorefrontEmail] = useState("")
    const [buyer_email, setBuyerEmail] = useState("")

    const [rating_item, setRatingItem] = useState("")
    const [rating_storefront, setRatingStorefront] = useState("")
    const [review, setReview] = useState("")

    // const [datetime, setDatetime] = useState("") // Ideally, this is automatically populated exactly when the form is actually submitted


    const initialState = {
        open: false,
        item_id: "",
        storefront_email: "",
        buyer_email: "",
        rating_item: "",
        rating_storefront: "",
        review: "",
        // datetime: ""
    };

    //const [{ open, name, price, quantity, item_desc, seller_desc, picture }, setState] = useState(initialState)

    function handleSubmit() {
        const data = {
            item_id: item_id,
            storefront_email: storefront_email,
            buyer_email: buyer_email,
            rating_item: rating_item,
            rating_storefront: rating_storefront,
            review: review,
            // datetime:datetime
        }
        axios.post('http://127.0.0.1:5000/review', data)
            .then((res) => {
                console.log(res);
                console.log(res.status);
            })
        setOpen(initialState.open)
        setItemID(initialState.item_id)
        setStorefrontEmail(initialState.storefront_email)
        setBuyerEmail(initialState.buyer_email)
        setRatingItem(initialState.rating_item)
        setRatingStorefront(initialState.rating_storefront)
        setReview(initialState.review)
        // setDatetime(initialState.datetime)
    }

    // function handleChange(e) {
    //     const { name, value } = e.target
    //     setState(prevState => ({ ...prevState, [name]: value }));
    //     console.log(this.state.name)
    // }

    return (
        <Modal
            as={Form}
            onSubmit={(() => handleSubmit())}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Create</Button>}
        >
            <Modal.Header>Add New Review</Modal.Header>
            <Modal.Content>
                <Form.Field>
                    <label>Item ID</label>
                    <input
                        required
                        placeholder='Item ID'
                        type='number'
                        value={item_id}
                        onChange={e => setItemID(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Storefront Email</label>
                    <input
                        required
                        placeholder='Who sold you this item?'
                        value={storefront_email}
                        onChange={e => setStorefrontEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Buyer Email</label>
                    <input
                        required
                        placeholder='What is your email?'
                        value={buyer_email}
                        onChange={e => setBuyerEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Item Rating</label>
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
                        <label>Storefront Rating</label>
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
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
export default CreateModal;