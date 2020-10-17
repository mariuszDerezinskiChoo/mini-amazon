import React from 'react';
import NavBar from './NavBar'
import {withRouter} from 'react-router';
 

function Home() {
  return (
    <div>
      <a href="/cart"><h2>Go to the cart page</h2></a>
    </div>
  );
}
 
export default withRouter(Home);