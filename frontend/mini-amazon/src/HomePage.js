import React from 'react';
import NavBar from './NavBar'
import {withRouter} from 'react-router';
 

function Home() {
  return (
    <div>
      <NavBar/>
    </div>
  );
}
 
export default withRouter(Home);