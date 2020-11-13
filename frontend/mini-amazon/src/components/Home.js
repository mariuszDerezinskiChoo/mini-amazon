import React from "react";

const Home = () => {
    return (
        <a href="/cart">cart page</a>

        // nutty sql query that returns top items per category
        // i've got a query, but only assuming we know the category in advance
        // see views.py ("books")
        // we can think about somehow iterating over every unique category...
        // also to consider: we've got hella categories - might not even be a smart idea
        //                   to iterate over every category
        // maybe we *do* implement categories manually, just like 4 featured categories
        // i.e., categories that we think are popular

    )
}

export default Home;