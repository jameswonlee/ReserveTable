import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantReviews } from "../../store/reviews";

import './Reviews.css';







function Reviews({ restaurant }) {
    const dispatch = useDispatch();
    const allReviews = restaurant.reviews;
    // const allReviews = useSelector(state => Object.values(state.reviews));

    console.log('allReviews', allReviews)

    useEffect(() => {
        dispatch(getAllRestaurantReviews(restaurant.id));
    }, [])



    return (
        <div>
            <div>
                {allReviews.map(review => (
                <div className="reviews-container">
                        <div className="review-container-left">
                            <div>
                                REVIEWER NAME
                            </div>
                        </div>
                        <div className="review-container-right">
                            <div key={review.id} className="review">
                                {review.review}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}




export default Reviews;