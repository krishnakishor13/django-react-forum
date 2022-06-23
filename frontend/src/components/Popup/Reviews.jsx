import React, { useEffect, useState } from "react";
import like from '../../assets/img/heart.svg';
import API from "../../API";
import ImgIconCross from "../../assets/img/cross.svg";

const api = new API();

const Reviews = ({ selectedPostId, setSelectedPostId, setShowReviews }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.getReviews(selectedPostId).then((reviews) => {
      setSelectedPostId(null);
      setReviews(reviews);
    });
  }, []);

  const getImgReaction = (like_count) => {
    switch (like_count) {
      case 1:
        return like;
      case 2:
        return like;
      case 3:
        return like;
      default:
        return like;
    }
  };

  return (
    <section class="popup">
      <div class="innter">
        <div class="popup-content">
          <div class="innter">
            <img src={ImgIconCross} onClick={() => setShowReviews(false)} class="cross" alt="" />
            <h2>Reviews</h2>
            <ul class="reviews">
              {reviews &&
                reviews.map((review) => (
                  <li>
                    <img src={getImgReaction(review.like_count)} alt="" />
                    <div class="name">{review.name}</div>
                    <div class="body">{review.body}</div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
