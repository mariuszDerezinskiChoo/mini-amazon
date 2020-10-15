import React, { useState } from 'react';
import { Button, Modal, Form, Input, TextArea, Dropdown } from 'semantic-ui-react';
import FileUpload from './FileUpload';
import dummyData from '../dummyData';
import axios from 'axios';

function ModifyModal() {
    const [open, setOpen] = useState(false)
    const [selectedData, setData] = useState([])

    const listings = []
    // TODO: DO THIS FROM DB INSTEAD WITH DATA PASSED IN FROM PROPS
    for (const [index, value] of dummyData.entries()) {
        listings.push({ text: value.name, value: value.id, content: value.name })
    }

    function handleSubmit() {
        axios.put('http://127.0.0.1:5000/seller', selectedData)
            .then((res) => {
                console.log(res);
            })
        setOpen(false)
    }

    return (
        <div>
            <Dropdown
                selection
                search
                placeholder='Your Listings'
                selectOnBlur={false}
                selectOnNavigation={false}
                options={listings}
                onChange={(e, data) => {
                    setOpen(true)
                    setData((dummyData.filter(listing => listing.id === data.value))[0])
                    // TODO: SET DATA WITH DB DATA INSTEAD
                }}
            />

            <Modal
                as={Form}
                onSubmit={(() => handleSubmit())}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>Modify Listing</Modal.Header>
                <Modal.Content>
                    <Form.Field>
                        <label>Item Name</label>
                        <input required defaultValue={selectedData.name} />
                    </Form.Field>
                    <Form.Group widths={2}>
                        <Form.Field>
                            <label>Price</label>
                            <Input required label='$' type='number' defaultValue={selectedData.price} />
                        </Form.Field>
                        <Form.Field>
                            <label>Quantity</label>
                            <input required defaultValue={selectedData.quantity} type='number' />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <label>Item Description</label>
                        <TextArea required defaultValue={selectedData.itemDesc} />
                    </Form.Field>
                    <Form.Field>
                        <label>Seller Description</label>
                        <TextArea required defaultValue={selectedData.sellerDesc} />
                    </Form.Field>
                    <Form.Field>
                        <label>Upload a Picture</label>
                        <FileUpload />
                    </Form.Field>
                    <Button primary type='submit'>Save</Button>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>
                        Cancel
                </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}
export default ModifyModal;