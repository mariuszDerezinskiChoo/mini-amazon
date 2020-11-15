//import React from "react";
import {Link} from "react-router-dom";
import {List, Header} from "semantic-ui-react";
import React, {useState, useEffect} from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";


export const Listings = ({ listings }) => {
    /*return (
        <>
        <h1>Results</h1>
        <List>
            {listings.map(listing => {
                return (
                    <List.Item key= {listing.item_id}>
                        <Header> <a href="/cart"><h2>{listing.name}</h2></a> Price: ${listing.price} Quantity: {listing.quantity}</Header>
                    </List.Item>
                )
            })}
        </List>
        </>
    )
} */
    if (!listings) {
        return (
            <h1> No results found!</h1> 
        )
    }
    /*const newTo = { 
        pathname: "/item/" + listing.name, 
        param1: listing.name,
        param2: listing.seller
    };*/

    return (
        <>
            <h1>Results</h1>
            <Container fluid="lg">
                {
                    listings == null ?  <h1>No Results Found!</h1> :
                    listings.map(listing => {
                        const newTo = { 
                            pathname: "/item/" + listing.name + "/" + listing.seller + "/" + listing.id, 
                            param1: listing.name,
                            param2: listing.seller
                        }
                        return (
                            <Card key={listing.item_id} className="mb-5">
                            <Row>
                                <Col xs={4}>
                                    <img style={{"width": "300px", "height": "200px"}} src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"></img>
                                </Col>
                                <Col xs={6}>
                                        <Link to = {newTo}><h2>{listing.name}</h2></Link>
                                        <h3>Sold by {listing.seller}</h3>
                                </Col>
                                <Col xs={2}>
                                    <div className="float-right mr-3 mt-3 mb-3">
                                        <Row>
                                            <p>${listing.price}</p>
                                        </Row>
                                        <Row>
                                            <p>{listing.quantity} in stock</p>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            </Card>
                        );
                    })
                }
            </Container>
        </>
    )
}
