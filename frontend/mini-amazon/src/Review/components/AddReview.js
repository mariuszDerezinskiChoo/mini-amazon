import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import CreateModal from './CreateModal.js';

function AddReview() {
    return (
        <Segment placeholder raised>
            <Header icon>
                <Icon name='edit outline' />
                Add New Review
            </Header>
            <CreateModal />
        </Segment>
    )
}
export default AddReview

