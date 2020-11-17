//import React from "react";
import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";


export const Listings = ({ listings }) => {
    if (!listings) {
        return (
            <h1> No results found!</h1> 
        )
    }

    return (
        <>
            <h1>Results</h1>
            <Container fluid="lg">
                {
                    listings == null ?  <h1>No Results Found!</h1> :
                    listings.map(listing => {
                        const newTo = { 
                            pathname: "/item/" + listing.seller + "/" + listing.id, 
                            param1: listing.seller,
                            param2: listing.id
                        }
                        return (
                            <Card key={listing.item_id} className="mb-5">
                            <Row>
                                <Col xs={4}>
                                    <img style={{"width": "300px", "height": "200px"}} src={listing.photo}></img>
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
