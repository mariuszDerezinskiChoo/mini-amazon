import React from "react";
import NavBar from '../NavBar';
import '../App.css';
import AddReview from '../Review/components/AddReview.js';
import PastReviews from '../Review/components/PastReviews.js';

function Review() {
  return (
    <div>
      <NavBar/>
      <div id='add-modify'>
        <AddReview />
      </div>
      <br />
      <div id='past-reviews'>
        <PastReviews />
      </div>
    </div>
  );
}
export default Review;
