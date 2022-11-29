import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { editReview } from '../../store/reviews';

import './UpdateReviewForm.css';

function UpdateReviewForm({ restaurant, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];

        if (!review) errors.push("Please tell us about your experience");
        if (!rating) errors.push("Please rate your experience");

        setValidationErrors(errors);

        if (!errors.length) {

            const reviewData = {
                review: review,
                rating: rating
            };

            await dispatch(editReview(reviewData, restaurant.id));
            alert("Review successfully updated");
            setShowModal(false);
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
                    {validationErrors.length > 0 &&
                        validationErrors.map(error =>
                            <li key={error}>{error}</li>
                        )}
                    <div className="review-inputs">
                        <input
                            type="text"
                            onChange={e => {
                                setValidationErrors([]);
                                setReview(e.target.value)
                            }}
                            value={review}
                            placeholder="Review"
                            className="review-text-input" />
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