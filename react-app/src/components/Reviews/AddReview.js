import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReview } from "../../store/reviews";
import { getOneRestaurant } from "../../store/restaurants";
import downCaret from '../../icons/down-caret.ico';
import './AddReview.css';


function AddReviewForm({ restaurant, setShowAddModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [validationErrors, setValidationErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];

        if (!review) errors.push("Please tell us about your experience");
        if (review.length > 500) errors.push("Review can not exceed 500 characters");
        if (!rating) errors.push("Please rate your experience");

        setValidationErrors(errors);

        if (!errors.length) {

            const reviewData = {
                review: review,
                rating: rating
            };

            await dispatch(createReview(reviewData, restaurant.id));
            await dispatch(getOneRestaurant(restaurant.id));
            setShowAddModal(false);
            history.push(`/restaurants/${restaurant.id}`);
        }
    }

    if (!sessionUser) return null;


    return (
        <div className="add-review-form-outer-container">
            <div className="review-form-heading">
                {sessionUser.first_name}, how was your experience at {restaurant.name}?
            </div>
            <div className="create-review-form-container">
                <form onSubmit={submitHandler} className="create-review-form">
                    <div className="review-validation-errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map(error =>
                                <div key={error}>{error}</div>
                            )}
                    </div>
                    <div className="create-review-rating-container">
                        <img src={downCaret} className="create-review-down-caret" alt=""/>
                        <select value={rating}
                            onChange={e => {
                                setValidationErrors([])
                                setRating(e.target.value)
                            }}
                            className="create-review-select red-star">
                            <option value="5">★ ★ ★ ★ ★</option>
                            <option value="4">★ ★ ★ ★</option>
                            <option value="3">★ ★ ★</option>
                            <option value="2">★ ★</option>
                            <option value="1">★</option>
                        </select>
                    </div>
                    <div className="review-inputs">
                        <div>
                            <textarea
                                type="text"
                                onChange={e => {
                                    setValidationErrors([]);
                                    setReview(e.target.value)
                                }}
                                value={review}
                                placeholder="Review"
                                className="review-text-input" />
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



export default AddReviewForm;