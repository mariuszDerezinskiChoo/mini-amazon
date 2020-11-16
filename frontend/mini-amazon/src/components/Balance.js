import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Form, Button}  from "react-bootstrap";

const Balance = (props) => {
    const [balance, setBalance] = useState(0);
    const [addBalance, setAddBalance] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getbalance').then((res) =>  setBalance(res.data.balance))
    },[]);

    const submit = () => {
        if(isNaN(addBalance)){
            alert("Please enter a valid number!");
        } else{
            let addBalance = parseFloat(addBalance);
            //axios.post()
        }
    }


    return (
        <>
            <h1>Balance: ${balance}</h1>
            <Form.Group>
            <Form.Control value={addBalance} onChange={e => setAddBalance(e.target.value)}size="lg" type="text" placeholder="Add to Balance" />
            <br />
            <Button onClick={submit}>Add Balance</Button>
            </Form.Group>
        </>
    )
}

export default Balance;