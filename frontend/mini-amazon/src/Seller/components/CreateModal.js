import React, { useState } from 'react';
import { Button, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import FileUpload from './FileUpload';
import axios from 'axios';

function CreateModal() {
    const [open, setOpen] = useState(false)

    function handleSubmit() {
        axios.post('http://127.0.0.1:5000/seller')
            .then((res) => {
                console.log(res);
            })
    }

    return (
        <Modal
            as={Form}
            onSubmit={(() => handleSubmit())}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Create</Button>}
        >
            <Modal.Header>Add New Item</Modal.Header>
            <Modal.Content>
                <Form.Field>
                    <label>Item Name</label>
                    <input required placeholder='Name' />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Price</label>
                        <Input required label='$' type='number' />
                    </Form.Field>
                    <Form.Field>
                        <label>Quantity</label>
                        <input required placeholder='Quantity' type='number' />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <label>Item Description</label>
                    <TextArea required placeholder='Description' />
                </Form.Field>
                <Form.Field>
                    <label>Seller Description</label>
                    <TextArea required placeholder='Describe Yourself' />
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