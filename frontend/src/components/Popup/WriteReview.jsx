import React, { useState } from "react";
import ImgIconCross from "../../assets/img/cross.svg";
import like from '../../assets/img/heart.svg';
import black from '../../assets/img/black.svg';
import API from "../../API";

const api = new API();

const WriteReview = ({ selectedPostId, setSelectedPostId, setShowWriteReview }) => {
  const [likeCount, setLikeCount] = useState(1),
    [name, setName] = useState(""),
    [body, setBody] = useState("");

  const inputName = (event) => {
    setName(event.target.value);
  };

  const inputBody = (event) => {
    setBody(event.target.value);
  };

  const sendReviewButton = () => {
    api.writeReview(selectedPostId, name, body, likeCount).then((review) => {
      alert("Your review has been sent. Thank you for your review!");
      setName("");
      setBody("");
      setLikeCount(1);
      setSelectedPostId(null);
      setShowWriteReview(false);
    });
  };

  return (
    <section class="popup">
      <div class="innter">
        <div class="popup-content">
          <div class="innter">
            <img src={ImgIconCross} onClick={() => setShowWriteReview(false)} class="cross" alt="" />
            <h2>Write Review</h2>
            <p>Choose your thought</p>
            <ul class="reactions">
              <li>
                {likeCount === 1 ? (
                  <img src={like} class="selected" onClick={() => setLikeCount(1)} alt="" />
                ) : (
                  <img src={like} onClick={() => setLikeCount(1)} alt="" />
                )}
              </li>
              <li>
                {likeCount === 0 ? (
                  <img src={like} class="selected" onClick={() => setLikeCount(0)} alt="" />
                ) : (
                  <img src={black} onClick={() => setLikeCount(0)} alt="" />
                )}
              </li>
            </ul>
            <input onChange={inputName} type="text" name="name" placeholder="Enter your name" required />
            <textarea onChange={inputBody} name="body" placeholder="Enter your review" required></textarea>
            <button onClick={sendReviewButton}>Write</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WriteReview;
