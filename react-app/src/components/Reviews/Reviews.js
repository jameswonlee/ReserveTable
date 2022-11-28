import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantReviews } from "../../store/reviews";







function Reviews({ restaurant }) {
    const dispatch = useDispatch();
    const allReviews = useSelector(state => Object.values(state.reviews));

    // console.log('allReviews', allReviews)
    useEffect(() => {
        dispatch(getAllRestaurantReviews(restaurant.id));
    })



    return (
        <div>
            <div>
                {allReviews.map(review => (
                    <div key={review.id}>{review.review}</div>
                ))}
            </div>


        </div>
    )
}




export default Reviews;