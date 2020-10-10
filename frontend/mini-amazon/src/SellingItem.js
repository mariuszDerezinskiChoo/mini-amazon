import React from 'react'
import pic from './placeholder.png'
import { Image, Button, Icon, Header, Card, Modal } from 'semantic-ui-react'
import './sellingItem.css'

function SellingItem(props) {
    const [open, setOpen] = React.useState(false)

    return (
        <Card>
            <Image src={pic} size='medium' />

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
                <Button color='grey' icon>
                    <Icon name='edit outline' />
                </Button>

                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                        <Button color='red' icon>
                            <Icon name='trash alternate outline' />
                        </Button>
                    }
                >
                    <Modal.Header>Delete Listing</Modal.Header>
                    <Modal.Content>
                        Are you sure you want to delete this listing? This cannot be undone!
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button color='red' onClick={() => setOpen(false)}>
                            Delete
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Card.Content>
        </Card >
    );
}
export default SellingItem;