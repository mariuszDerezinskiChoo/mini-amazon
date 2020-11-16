import React, { useState } from 'react';
import { Button, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import FileUpload from './FileUpload';
import axios from 'axios';

function CreateModal() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [item_desc, setItemDesc] = useState("")
    const [seller_desc, setSellerDesc] = useState("")
    const [picture, setPicture] = useState("")

    const initialState = {
        open: false,
        name: "",
        price: "",
        quantity: "",
        category: "",
        item_desc: "",
        seller_desc: "",
        picture: ""
    };

    //const [{ open, name, price, quantity, item_desc, seller_desc, picture }, setState] = useState(initialState)

    function handleSubmit() {
        const data = {
            name: name,
            price: price,
            quantity: quantity,
            category: category,
            item_desc: item_desc,
            seller_desc: seller_desc,
            picture: picture
        }

        axios.post('http://127.0.0.1:5000/seller', data)
            .then((res) => {
                console.log(res);
                console.log(res.status);
            })

        setOpen(initialState.open)
        setName(initialState.name)
        setPrice(initialState.price)
        setQuantity(initialState.quantity)
        setCategory(initialState.category)
        setItemDesc(initialState.item_desc)
        setSellerDesc(initialState.seller_desc)
        setPicture(initialState.picture)
        //window.location.reload();
    }

    return (
        <Modal
            as={Form}
            onSubmit={(() => handleSubmit())}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Create</Button>}
            id='Semantic-Modal'
        >
            <Modal.Header>Add New Item</Modal.Header>
            <Modal.Content>
                <Form.Field>
                    <label>Item Name</label>
                    <input
                        required
                        placeholder='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Price</label>
                        <Input
                            required
                            label='$'
                            placeholder='Price'
                            type='number'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Quantity</label>
                        <input
                            required
                            placeholder='Quantity'
                            type='number'
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label>Category</label>
                    <input
                        required
                        placeholder='Category'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Item Description</label>
                    <TextArea
                        required
                        placeholder='Description'
                        value={item_desc}
                        onChange={e => setItemDesc(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Seller Description</label>
                    <TextArea
                        required
                        placeholder='Describe Yourself'
                        value={seller_desc}
                        onChange={e => setSellerDesc(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Upload a Picture</label>
                    <FileUpload />
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

