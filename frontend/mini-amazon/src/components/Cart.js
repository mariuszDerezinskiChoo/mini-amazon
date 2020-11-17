import React, {useState, useEffect} from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import backend from "../config"
import NavBar from '../NavBar';
const Cart = () => {
    const [cart, setCart] = useState(null);

    const handleRemove = (index) => {
        let cartTemp = [...cart];
        setCart(cartTemp);
    }

    useEffect(() => {
        axios.get(backend + '/cart',{ params: { "buyerEmail": JSON.parse(sessionStorage.getItem('email')) } }).then((res) => {
            setCart(res.data);
        })
    },[])

    const handleIncrement = (index, increment) => {
        let cartTemp = [...cart];
        cartTemp[index].quantity += increment;
        setCart(cartTemp);
    }

    const handleUpdate = (index) => {
        const payload = {...cart[index], "buyerEmail": JSON.parse(sessionStorage.getItem('email'))};
        console.log(payload);
        axios.post(backend + "/updateCart",payload).then((res) => {
            console.log(res.status);
        })
    }

    return (
        <>
          <NavBar/>
            <h1>view your cart</h1>
            <Container fluid="lg">
                {
                    cart == null ? <h1>Loading</h1> : 
                    cart.map((entry, index) => {
                        return (
                            <Card key={index} className="mb-5">
                            <Row>
                                <Col xs={4}>
                                    <img style={{"width": "300px", "height": "200px"}} src={entry.imageUrl}></img>
                                </Col>
                                <Col xs={6}>
                                        <h2>{entry.itemName}</h2>
                                        <h3>Sold by {entry.sellerName}</h3>
                                        <p>{entry.description}</p>
                                </Col>
                                <Col xs={2}>
                                    <div className="float-right mr-3 mt-3 mb-3">
                                        <Row>
                                            <FontAwesomeIcon style={{clear:"both"}} size="2x" onClick={() => handleRemove(index)} icon={faTimesCircle}/>
                                        </Row>
                                        <Row>
                                            <FontAwesomeIcon size="2x" color="#09B049" onClick={() => handleIncrement(index,1)} icon={faPlusCircle}/>
                                        </Row>
                                        <Row>
                                            <p>{entry.quantity}</p>
                                        </Row>
                                        <Row>
                                            <FontAwesomeIcon size="2x" color="#FF0000" onClick={() => handleIncrement(index,-1)} icon={faMinusCircle}/>
                                        </Row>
                                        <Row>
                                            <Button onClick={() => handleUpdate(index)}>Update</Button>
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

export default Cart;