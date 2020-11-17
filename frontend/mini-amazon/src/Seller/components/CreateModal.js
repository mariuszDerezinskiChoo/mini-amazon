import React, { useState } from 'react';
import { Button, Modal, Form, Input, TextArea, Image } from 'semantic-ui-react';
import axios from 'axios';
import imgur from "imgur-file-upload";
import backend from "../../config"

imgur.setClientId('c7cbb16d550b502');

function CreateModal() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [item_desc, setItemDesc] = useState("")
    const [seller_desc, setSellerDesc] = useState("")
    const [picture, setPicture] = useState("")
    const [file, setFile] = useState("");

    const user_email = JSON.parse(sessionStorage.getItem('email'));

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

    const ImageThumb = ({ image }) => {
        return <Image src={URL.createObjectURL(image)} alt={image.name} size='medium' />;
    };

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

        console.log(picture)

        axios.post(backend + '/seller/' + user_email, data)
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
        window.location.reload();
    }

    async function handleUpload(event) {
        const test = event.target.files[0]
        setFile(event.target.files[0]);
        console.log(test)
        const formData = new FormData()
        formData.append('type', 'file')
        formData.append('image', test)

        imgur.uploadImgur(test).then((result) => {
            const url = result['url']
            console.log(url);
            setPicture(url)
          });
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
                    <div id="upload-box">
                        <input type="file" accept="image/*" onChange={handleUpload} />
                        {file && <ImageThumb image={file} />}
                    </div>
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

