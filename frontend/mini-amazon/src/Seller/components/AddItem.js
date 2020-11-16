import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import CreateModal from './CreateModal.js';

function AddItem() {
    return (
        <Segment placeholder raised>
            <Header icon>
                <Icon name='dollar' />
                Add New Item
            </Header>
            <CreateModal />
        </Segment>
    )
}
export default AddItem

