import {Link} from "react-router-dom";
import {List, Header} from "semantic-ui-react";
import React, {useState, useEffect, Component} from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';
import NavBar from '../NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import Quantity from './Quantity';


export const Items = ({ items}) => {
    const [count, setCount] = useState(0);
    console.log(items)
    if (!items) {
        return (
            <h1> No results found!</h1> 
        )
    }

    return (
        <>
        <NavBar/>
        <List>
            {items.map(item => {
                const id = item.id;
                const quantity = count;
                const selleremail = item.selleremail;
                const buyeremail = JSON.parse(sessionStorage.getItem('email'));
                return (
                    <List.Item key= {item.id}>
                        <Header> <h1>{item.name}</h1> </Header>
                        <h3> Category: {item.category} </h3>
                
                        <Rating name= "half-rating-read" defaultValue={item.avg_rating} precision={0.1} readOnly />
                        <h7>({item.total_reviews} reviews)</h7>
                        <Col xs={4}>
                            <img style={{"width": "300px", "height": "200px"}} src={item.photo}></img>
                        </Col>
                        <h2> Sold by: {item.seller}</h2>
                        <h2> Price: ${item.price}</h2>
                        <h2> {item.quantity} in stock </h2>
                        <h2> Description: {item.description}</h2>
                        <Col xs={2}>
                            <div className="float-center mr-3 mt-3 mb-3">
                        <Row>
                            <FontAwesomeIcon size="2x" color="#0080FF" onClick={() => setCount(count + 1)} icon={faPlusCircle}/>
                        </Row>
                        <Row>
                            <p>{count}</p>
                        </Row>
                        <Row>
                            <FontAwesomeIcon size="2x" color="#7285A5" onClick={() => setCount(count - 1)} icon={faMinusCircle}/>
                        </Row>
                            </div>
                        </Col>
                        <button
                            onClick={async () => {
                            const addCart = { id, quantity, selleremail, buyeremail};
                            const response = await fetch("/add_cart", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(addCart)
                            });
                            if (response.ok) {
                                console.log("response worked!");
                              }
                            }}
                        >
                        Add to Cart
                        </button>
                        <h3>Product Reviews</h3>
                        <Container fluid="lg">
                            { item.reviews.map(review => {
                                return (
                                <>
                                <Card key={item.id} className="mb-5"></Card>
                                <Rating name= "half-rating-read" defaultValue={review.rating} precision={0.1} readOnly />
                                <Col xs={6}>
                                        <h2>{review.email}</h2>
                                </Col>
                                <h3> {review.review} </h3>
                                </>
                                )
                            })}
                        </Container>
                    </List.Item>
                    
                )
            })}
        </List>
        </>
    )
} 
