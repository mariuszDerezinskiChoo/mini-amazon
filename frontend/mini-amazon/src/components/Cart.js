import React, {useState} from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
const CART_DUMMY = [
    {
        itemName: "Macbook Pro",
        sellerName: "Apple.com Inc.",
        price: 1500,
        count: 3,
        imageUrl: "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        description: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."
    },
    {
        itemName: "Macbook Pro",
        sellerName: "Apple.com Inc.",
        price: 1500,
        count: 3,
        imageUrl: "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        description: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."

    },
    {
        itemName: "Macbook Pro",
        sellerName: "Apple.com Inc.",
        price: 1500,
        count: 3,
        imageUrl: "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        description: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."

    },
    {
        itemName: "Macbook Pro",
        sellerName: "Apple.com Inc.",
        price: 1500,
        count: 3,
        imageUrl: "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        description: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."

    },
    {
        itemName: "Macbook Pro",
        sellerName: "Apple.com Inc.",
        price: 1500,
        count: 3,
        imageUrl: "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        description: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."
    },
]
const Cart = () => {
    const [cart, setCart] = useState(CART_DUMMY);
    console.log("reload");
    const handleRemove = (index) => {
        console.log(index)
        let cartTemp = [...cart];
        console.log(cartTemp.splice(index,1));
        console.log(cartTemp);
        setCart(cartTemp);
    }

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