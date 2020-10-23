import React from "react";
import {Link} from "react-router";
import {List, Header} from "semantic-ui-react";

export const Listings = ({ listings }) => {
    //<Header> Search Results </Header>
    return (
        <List>
            {listings.map(listing => {
                return (
                    <List.Item key= {listing.item_id}>
                        <Header> <a href="/cart"><h2>{listing.name}</h2></a> Price: ${listing.price} Quantity: {listing.quantity}</Header>
                    </List.Item>
                )
            })}
        </List>
    )
}
