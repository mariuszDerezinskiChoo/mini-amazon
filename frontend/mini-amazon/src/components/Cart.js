import React, {useState, useEffect} from "react";
import {Container, Row, Col } from "react-bootstrap";
import { Card, Icon, Image, Button} from 'semantic-ui-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import backend from "../config"
import NavBar from '../NavBar';
import {Link} from "react-router-dom";

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
        return axios.post(backend + "/updateCart",payload).then((res) => {
            console.log(res.status);
        })
    }

    const handlePurchase = () => {
        let updates = [];
        for(let i = 0; i < cart.length; i++){
            updates.push(handleUpdate(i));
        }
        Promise.all(updates).then(() => {
            const payload = {"email": JSON.parse(sessionStorage.getItem('email'))};
            console.log(payload);
            axios.post(backend + "/purchase-cart",payload).then((res) => {
                console.log(res);
                alert(res.data);
                window.location.reload();
            })
        })
    }

    let totalPrice = 0;
    if(cart){
        for(let i = 0; i < cart.length; i++){
            totalPrice += cart[i].quantity * cart[i].price;
        }
    }

    return (
        <>
          <NavBar/>
            
            <Container>
                <Row className="justify-content-center">
                <h1>view your cart</h1>
                </Row>
                <Row className="justify-content-center mb-4">
                {
                    cart == null ? <h1>Loading</h1> : 
                    cart.map((entry, index) => {
                        const newTo = { 
                            pathname: "/item/" + entry.sellerName + "/" + entry.itemId, 
                        }
                        return (
                            <Card className="ml-2 mr-2">
                            <FontAwesomeIcon style={{clear:"both"}} size="2x" onClick={() => handleRemove(index)} icon={faTimesCircle}/>
                            <Image src={entry.imageUrl} wrapped ui={false} />
                            <Card.Content>
                              <Card.Header>{entry.itemName}</Card.Header>
                              <Card.Meta>
                                <span className='date'>Sold by {entry.sellerName}</span>
                              </Card.Meta>
                              <Card.Description>
                              {entry.description}
                              </Card.Description>
                              <Row className="justify-content-center">
                              <Card.Description>
                              ${entry.price.toFixed(2)} each
                              </Card.Description>
                              </Row>
                            </Card.Content>
                            <Card.Content extra>
                                <Row className="justify-content-center">
                                    <FontAwesomeIcon size="2x" color="#09B049" onClick={() => handleIncrement(index,1)} icon={faPlusCircle}/>
                                    <p>{entry.quantity}</p>
                                    <FontAwesomeIcon size="2x" color="#FF0000" onClick={() => handleIncrement(index,-1)} icon={faMinusCircle}/>
                                </Row>
                                <Row className="justify-content-center">
                                <Button primary onClick={() => handleUpdate(index)}>Update</Button>            
                                </Row>

                            </Card.Content>
                            <Card.Content extra >
                                <Row className="justify-content-center">
                                    <p>Total: ${(entry.price * entry.quantity).toFixed(2)}</p>
                                </Row>
                            
                            </Card.Content>
                          </Card>
                        );
                    })
                }
                </Row>
                <Row className="justify-content-center mt-5 mb-3">
                <h2>Cart total: ${totalPrice.toFixed(2)}</h2>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Button secondary onClick={handlePurchase}>Purchase</Button>
                </Row>

                
            </Container>
        </>
    )
}

export default Cart;