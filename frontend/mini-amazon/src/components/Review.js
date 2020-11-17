import React from "react";
import NavBar from '../NavBar';
import '../App.css';
import PastReviews from '../Review/components/PastReviews.js';

function Review() {
  return (
    <div>
      <NavBar/>
      <br />
      <div id='past-reviews'>
        <PastReviews />
      </div>
    </div>
  );
}
export default Review;
