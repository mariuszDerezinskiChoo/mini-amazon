import React, {useState, useEffect} from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const PurchaseHistory = () => {
    const [history, setHistory] = useState(null);
    console.log("reload");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getOrderHistory').then((res) => {
            console.log(res.data)
            setHistory(res.data);
        })
    },[])

    return (
        <>
            <h1>Trade History</h1>
            <Container fluid="lg">
                {
                    history == null ? <h1>Loading</h1> : 
                    history.map((entry, index) => {
                        return (
                            <Card key={index} className="mb-5">
                            <Row>
                                <Col xs={4}>
                                    <img style={{"width": "300px", "height": "200px"}} src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"></img>
                                </Col>
                                <Col xs={6}>
                                        <h2>{entry.itemName}</h2>
                        <h3>Purchased from {entry.name}</h3>
                        <p>on {entry.time}</p>
                        <p>{entry.quantity} units</p>
                        <p>at ${entry.price} each</p>
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

export default PurchaseHistory;