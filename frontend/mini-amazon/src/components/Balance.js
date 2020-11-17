import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Form, Button, Container, Row, Col}  from "react-bootstrap";
import backend from "../config";
import NavBar from "../NavBar"

const Balance = (props) => {
    const [balance, setBalance] = useState(0);
    const [addBalance, setAddBalance] = useState(0);

    useEffect(() => {
        axios.get(backend + '/getbalance',{ params: { "email": JSON.parse(sessionStorage.getItem('email')) } }).then((res) =>  setBalance(res.data.balance))
    },[]);

    const submit = () => {
        if(isNaN(addBalance)){
            alert("Please enter a valid number!");
        } else{
            let floatAddBalance = parseFloat(addBalance);
            const payload = {"adding": floatAddBalance, "email": JSON.parse(sessionStorage.getItem('email'))};
            axios.post(backend + "/addBalance",payload).then(res => {
                setBalance(res.data.newBalance);
            });
        }
    }


    return (
        <>
        <NavBar></NavBar>
        <Container>
            <Row className="justify-content-center">
                <h1>Balance: ${balance}</h1>
            </Row>
            <Row className="justify-content-center">
                <Form.Group className="ml-4">
                    <Form.Control value={addBalance} onChange={e => setAddBalance(e.target.value)}size="lg" type="text" placeholder="Add to Balance" />
                </Form.Group>
            </Row>
            <Row className="justify-content-center">
                <Button className="mt-2" onClick={submit}>Add Balance</Button>
            </Row>
        </Container>

        </>
    )
}

export default Balance;