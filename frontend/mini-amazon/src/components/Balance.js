import React, {useEffect, useState} from "react";
import axios from 'axios';

const Balance = (props) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getbalance').then((res) =>  console.log(res.data))
    },[]);


    return (
    <h1>Balance: {balance}</h1>
    )
}

export default Balance;