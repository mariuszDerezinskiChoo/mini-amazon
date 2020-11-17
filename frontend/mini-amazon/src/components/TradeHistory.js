import React, {useState, useEffect} from "react";
import {Container, Row, Col } from "react-bootstrap";
import { Card, Icon, Image, Button} from 'semantic-ui-react';
import axios from 'axios';
import NavBar from "../NavBar";
const TradeHistory = () => {
    const [history, setHistory] = useState(null);
    console.log("reload");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getTradeHistory',{ params: { "email": JSON.parse(sessionStorage.getItem('email')) } }).then((res) => {
            console.log(res.data)
            setHistory(res.data);
        })
    },[])

    return (
        <>
            <NavBar/>
            <Container fluid="lg">
                <Row className="justify-content-center">
                    <h1>Trade History</h1>
                </Row>
                <Row>
                    {
                        history == null ? <h1>Loading</h1> : 
                        history.map((entry, index) => {
                            let time = entry.time;
                            let year = parseInt(time.substring(0,4))
                            let month = parseInt(time.substring(4,6)) - 1;
                            let day = parseInt(time.substring(6,8));
                            let date = new Date(year,month,day);


                            return (
                                <Card className="ml-2 mr-2">
                                <Image src={entry.imageUrl} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>{entry.itemName}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Bought by by {entry.firstName} {entry.lastName}</span>
                                </Card.Meta>
                                <Card.Meta>
                                <p>Purchased on {date.toDateString()}</p>
                                </Card.Meta>
                                <Card.Meta>
                                <p>{entry.quantity} units</p>
                                </Card.Meta>
                                <Row className="justify-content-center">
                                <Card.Description>
                                ${entry.price.toFixed(2)} each
                                </Card.Description>
                                
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
            </Container>
        </>
    )
}

export default TradeHistory;