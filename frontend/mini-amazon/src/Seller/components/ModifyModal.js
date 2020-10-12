import React from 'react';
import { Button, Modal, Form, Input, TextArea, Dropdown } from 'semantic-ui-react';
import FileUpload from './FileUpload';
import dummyData from '../dummyData';

function ModifyModal() {
    const [open, setOpen] = React.useState(false)
    const [selectedData, setData] = React.useState([])

    const listings = []
    for (const [index, value] of dummyData.entries()) {
        listings.push({ text: value.name, value: value.id, content: value.name })
    }

    return (
        <div>
            <Dropdown
                placeholder='Your Listings'
                selection
                options={listings}
                onChange={(e, data) => {
                    setOpen(true)
                    console.log(data.value)
                    setData((dummyData.filter(listing => listing.id === data.value))[0])
                }}
            />

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>Add New Item</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Item Name</label>
                            <input required value={selectedData.name} />
                        </Form.Field>
                        <Form.Group widths={2}>
                            <Form.Field>
                                <label>Price</label>
                                <Input required label='$' type='number' value={selectedData.price} />
                            </Form.Field>
                            <Form.Field>
                                <label>Quantity</label>
                                <input required value={selectedData.quantity} type='number' />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Item Description</label>
                            <TextArea required value={selectedData.itemDesc} />
                        </Form.Field>
                        <Form.Field>
                            <label>Seller Description</label>
                            <TextArea required value={selectedData.sellerDesc} />
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
        </div>
    )
}
export default ModifyModal;