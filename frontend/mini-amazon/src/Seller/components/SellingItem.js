import React, { useState } from 'react';
import placeholder from '../placeholder.png';
import { Button, Icon, Header, Card, Modal, Form, Input, TextArea, Image } from 'semantic-ui-react';
import '../styles/sellingItem.css';
import axios from 'axios';
import imgur from "imgur-file-upload";
import backend from "../../config"

function SellingItem(props) {
    const [delOpen, setDelOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)

    const [name, setName] = useState(props.item.name)
    const [price, setPrice] = useState(props.item.price)
    const [quantity, setQuantity] = useState(props.item.quantity)
    const [category, setCategory] = useState(props.item.category)
    const [item_desc, setItemDesc] = useState(props.item.item_desc)
    const [seller_desc, setSellerDesc] = useState(props.item.seller_desc)
    const [picture, setPicture] = useState(props.item.picture)

    const [file, setFile] = useState("");

    const ImageThumb = ({ image }) => {
        return <Image src={URL.createObjectURL(image)} alt={image.name} size='medium' />;
    };
    
    const user_email = JSON.parse(sessionStorage.getItem('email'));

    // const location = inArray(props.item.id) ? picLocations.find(el => el.id === props.item.id)["location"] : placeholder

    function handleSubmit() {
        const data = {
            id: props.item.id,
            name: name,
            price: price,
            quantity: quantity,
            category: category,
            item_desc: item_desc,
            seller_desc: seller_desc,
            picture: picture
        }

        axios.put(backend + '/seller/' + user_email, data)
            .then((res) => {
                console.log(res);
            })

        setEditOpen(false)
        window.location.reload();
    }

    function handleDelete() {
        const data = {
            id: props.item.id,
            name: name
        }
        axios.post(backend + '/delete_listing/' + user_email, data)
            .then((res) => {
                console.log(res);
            })
        setDelOpen(false)
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
            setPicture(result);
          });
    }

    console.log(props.item.picture);

    return (
        <Card>
            <img
                src={props.item.picture}
                height={400}
                alt={placeholder}
            />

            <Card.Content>
                <Card.Header>{props.item.name}</Card.Header>
                <br />

                <div>
                    <div id='price'>
                        <Header sub>Price</Header>
                        <span>${props.item.price}</span>
                    </div>

                    <div id='quantity'>
                        <Header sub>Quantity</Header>
                        <span>{props.item.quantity}</span>
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
                    <Modal.Header>Modify Listing</Modal.Header>
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
                        <Button onClick={() => setEditOpen(false)}>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Modal
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
                    <Modal.Header>Delete Listing</Modal.Header>
                    <Modal.Content>
                        Are you sure you want to delete this listing? This cannot be undone!
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setDelOpen(false)}>
                            Cancel
                        </Button>
                        <Button color='red' onClick={() => handleDelete()}>
                            Delete
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Card.Content>
        </Card >
    );
}
export default SellingItem;

