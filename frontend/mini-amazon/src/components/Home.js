import React from "react";
import NavBar from '../NavBar';
import {Container, Row, Col, Card, Button} from "react-bootstrap"

export const Home = ( {recs} ) => {
    console.log(recs)
    const name = JSON.parse(sessionStorage.getItem('first_name'));
    return (
        <>
        <NavBar/>
        <h2 className="form-group text-center" style={{ fontsize: 40, color: 'black'}}>Welcome {name}! </h2>
        <a href="/cart">Go to cart</a>
        <h2>Top Items</h2>
        <Container fluid="lg">
                {
                    recs == null ?  <h1>No Results Found!</h1> :
                    recs.map(rec => {
                        return (
                            <Card key={rec.item_id} className="mb-5">
                            <Row>
                                <Col xs={4}>
                                    <img style={{"width": "300px", "height": "200px"}} src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"></img>
                                </Col>
                                <Col xs={6}>
                                        <h2>{rec.name}</h2>
                                </Col>
                                <Col xs={2}>
                                    <div className="float-right mr-3 mt-3 mb-3">
                                        <Row>
                                            <p>${rec.price}</p>
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