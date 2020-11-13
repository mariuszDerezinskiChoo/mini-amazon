import React from "react";
import '../App.css';
import AddModifyReview from '../Review/components/AddModifyReview.js';
import PastReviews from '../Review/components/PastReviews.js';


function Review() {
  return (
    <div>
      <div id='add-modify'>
        <AddModifyReview />
      </div>
      <br />
      <div id='past-reviews'>
        <PastReviews />
      </div>
    </div>
  );
}
export default Review;

