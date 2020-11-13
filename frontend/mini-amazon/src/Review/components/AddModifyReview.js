import React from 'react';
import { Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import CreateModal from './CreateModal.js';
import ModifyModal from './ModifyModal.js';

function addModifyReview() {
    return (
        <Segment placeholder raised>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='edit outline' />
                            Add New Review
                        </Header>
                        <CreateModal />
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='edit outline' />
                            Edit Review
                        </Header>
                        <ModifyModal />
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </Segment>
    )
}
export default addModifyReview