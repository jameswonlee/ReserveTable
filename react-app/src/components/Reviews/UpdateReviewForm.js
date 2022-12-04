import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { editReview } from '../../store/reviews';

import './UpdateReviewForm.css';
import { getOneRestaurant } from "../../store/restaurants";

function UpdateReviewForm({ restaurant, review, setShowUpdateModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [reviewText, setReviewText] = useState(review.review);
    const [rating, setRating] = useState(review.rating);
    const [validationErrors, setValidationErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];

        if (!reviewText) errors.push("Please tell us about your experience");
        if (reviewText.length > 500) errors.push("Review can not exceed 500 characters");
        if (!rating) errors.push("Please rate your experience");

        setValidationErrors(errors);

        if (!errors.length) {

            const reviewData = {
                review: reviewText,
                rating: rating
            };

            await dispatch(editReview(reviewData, review.id));
            alert("Review successfully updated");
            await dispatch(getOneRestaurant(restaurant.id));
            setShowUpdateModal({ showModal: false, reviewId: 0 });
            history.push(`/restaurants/${restaurant.id}`);
        }
    }

    return (
        <div className="add-review-form-outer-container">
            <div className="review-form-heading">
                {sessionUser.first_name}, how was your experience at {restaurant.name}?
            </div>
            <div className="create-review-form-container">
                <form onSubmit={submitHandler} className="create-review-form">
                    <div className="update-review-validation-errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map(error =>
                                <div key={error}>{error}</div>
                            )}
                    </div>
                    <div className="review-inputs">
                        <div>
                            <textarea
                                type="text"
                                onChange={e => {
                                    setValidationErrors([]);
                                    setReviewText(e.target.value)
                                }}
                                value={reviewText}
                                placeholder="Review"
                                className="review-text-input" />
                        </div>
                        <div>
                            <input
                                type="number"
                                onChange={e => {
                                    setValidationErrors([]);
                                    setRating(e.target.value)
                                }}
                                value={rating}
                                placeholder="Rating"
                                min="1"
                                max="5"
                                className="rating-input" />
                        </div>
                        <div className="review-submit-button-container">
                            <button
                                disabled={!!validationErrors.length}
                                className="submit-review-button">
                                Submit Review
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>




    )
}



export default UpdateReviewForm;