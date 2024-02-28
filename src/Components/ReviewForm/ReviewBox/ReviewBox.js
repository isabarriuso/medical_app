import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating, onStarClick }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          color={star <= rating ? '#ffd700' : '#e4e5e9'}
          onClick={() => onStarClick(star)}
          style={{ cursor: 'pointer', marginRight: '5px' }}
        />
      ))}
    </div>
  );
};

const ReviewForm = () => {
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [reviewsList, setReviewsList] = useState([]);
  const [rating, setRating] = useState(1);
  
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Add the new review to the list
    setReviewsList([...reviewsList, review]);
    // Clear the review input field
    setReview('');
  };

  return (
    <div className="container">
      <h1>Patient Reviews</h1>

      <div className="reviews-list">
        {reviewsList.length > 0 ? (
          <ul>
            {reviewsList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>

      <div className="review-form">
        <h2>Leave a Review</h2>
        <form onSubmit={handleReviewSubmit}>
         <div className="form-group">
            <label htmlFor="review">Your Name:</label>
            <textarea
              id="review"
              value={name}
              onChange={(e) => setName(e.target.value)}
              rows="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="review">Your Review:</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <StarRating rating={rating} onStarClick={handleStarClick} />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;