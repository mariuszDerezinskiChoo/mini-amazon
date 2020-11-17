import React, {useState, useEffect} from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import backend from "../config"
import NavBar from '../NavBar';
import {Link} from "react-router-dom";

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
        axios.get(backend + '/cart').then((res) => {
            setCart(res.data);
        })
    },[])

    const handleIncrement = (index, increment) => {
        let cartTemp = [...cart];
        cartTemp[index].quantity += increment;
        setCart(cartTemp);
    }

    const handleUpdate = (index) => {
        const payload = cart[index]
        console.log(payload);
        axios.post(backend + "/updateCart",payload).then((res) => {
            console.log(res.status);
        })
    }

    return (
        <>
          <NavBar/>
            <h1>View Your Cart</h1>
            <Container fluid="lg">
                {
                    cart == null ? <h1>Loading</h1> : 
                    cart.map((entry, index) => {
                        const newTo = { 
                            pathname: "/item/" + entry.sellerName + "/" + entry.itemId, 
                        }
                        return (
                            <Card key={index} className="mb-5">
                            <Row>
                                <Col xs={4}>
                                    <img style={{"width": "300px", "height": "200px"}} src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"></img>
                                </Col>
                                <Col xs={6}>
                                        <Link to = {newTo}><h2>{entry.itemName}</h2></Link>
                                        <h3>Sold by {entry.sellerName}</h3>
                                        <p>{entry.description}</p>
                                </Col>
                                <Col xs={2}>
                                    <div className="float-right mr-3 mt-3 mb-3">
                                        <Row>
                                            <FontAwesomeIcon style={{clear:"both"}} size="2x" onClick={() => handleRemove(index)} icon={faTimesCircle}/>
                                        </Row>
                                        <Row>
                                            <FontAwesomeIcon size="2x" color="#0080FF" onClick={() => handleIncrement(index,1)} icon={faPlusCircle}/>
                                        </Row>
                                        <Row>
                                            <p>{entry.quantity}</p>
                                        </Row>
                                        <Row>
                                            <FontAwesomeIcon size="2x" color="#7285A5" onClick={() => handleIncrement(index,-1)} icon={faMinusCircle}/>
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