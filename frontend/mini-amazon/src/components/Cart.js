import React, {useState, useEffect} from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const Cart = () => {
    const [cart, setCart] = useState(null);
    console.log("reload");
    const handleRemove = (index) => {
        console.log(index)
        let cartTemp = [...cart];
        console.log(cartTemp.splice(index,1));
        console.log(cartTemp);
        setCart(cartTemp);
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/cart').then((res) => {
            setCart(res.data);
        })
    },[])

    const handleIncrement = (index, increment) => {
        let cartTemp = [...cart];
        cartTemp[index].count += increment;
        setCart(cartTemp);
    }

    return (
        <>
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
                                            <p>{entry.count}</p>
                                        </Row>
                                        <Row>
                                            <FontAwesomeIcon size="2x" color="#FF0000" onClick={() => handleIncrement(index,-1)} icon={faMinusCircle}/>
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