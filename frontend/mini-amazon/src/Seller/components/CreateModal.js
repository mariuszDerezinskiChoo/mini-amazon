import React from 'react';
import { Button, Modal, Form, Input, TextArea } from 'semantic-ui-react';
import FileUpload from './FileUpload';

function CreateModal() {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Create</Button>}
        >
            <Modal.Header>Add New Item</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Item Name</label>
                        <input required placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <Input required label='$' type='number' />
                    </Form.Field>
                    <Form.Field>
                        <label>Quantity</label>
                        <input required placeholder='Quantity' />
                    </Form.Field>
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
                    <Button primary type='submit'>Create</Button>
                </Form>
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