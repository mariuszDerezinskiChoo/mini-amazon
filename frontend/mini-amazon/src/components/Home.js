import React, {useState} from "react";
import NavBar from '../NavBar';
import {Container, Row, Col, Card, Button} from "react-bootstrap"
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";

export const Home = ( {recs}) => {
    const [count, setCount] = useState(0);
    const name = JSON.parse(sessionStorage.getItem('first_name'));
    return (
        <>
        <h2 className="form-group text-center" style={{ fontsize: 80, color: 'black'}}>Welcome {name}! </h2>
        <h2>Top Items</h2>
        <Container fluid="lg">
                {
                    recs == null ?  <h1>No Results Found!</h1> :
                    recs.map(rec => {
                        const newTo = { 
                            pathname: "/item/" + rec.seller + "/" + rec.id, 
                            param1: rec.seller,
                            param2: rec.id
                        }
                        const id = rec.id;
                        const quantity = count;
                        const selleremail = rec.selleremail;
                        const buyeremail = JSON.parse(sessionStorage.getItem('email'));
                        return (
                            <Card key={rec.item_id} className="mb-5">
                            <Row>
                                <Col xs={4}>
                                    <img style={{"width": "300px", "height": "200px"}} src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"></img>
                                </Col>
                                <Col xs={6}>
                                    <Link to = {newTo}><h2>{rec.name}</h2></Link>
                                    <h3>Sold by {rec.seller}</h3>
                                </Col>
                                <Col xs={2}>
                                    <div className="float-right mr-3 mt-3 mb-3">
                                        <Row>
                                            <p>${rec.price}</p>
                                        </Row>
                                        <Row>
                                            <p>{rec.quantity} in stock</p>
                                        </Row>
                                        <Row>
                                            <FontAwesomeIcon size="2x" color="#0080FF" onClick={() => setCount(count + 1)} icon={faPlusCircle}/>
                                        </Row>
                                        <Row>
                                            <p>{count}</p>
                                        </Row>
                                        <Row>
                                            <FontAwesomeIcon size="2x" color="#7285A5" onClick={() => setCount(count - 1)} icon={faMinusCircle}/>
                                        </Row>
                                        <Row>
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

export default Home;