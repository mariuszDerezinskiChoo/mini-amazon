import React, {useEffect} from "react";
import axios from 'axios';

const Balance = (props) => {

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/getbalance').then((res) =>  console.log(res.data))
    },[]);


    return (
        <h1>Tester</h1>
    )
}

export default Balance;