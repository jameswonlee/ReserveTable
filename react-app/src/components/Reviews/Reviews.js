import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";







function Reviews({ restaurant }) {
    const dispatch = useDispatch();
    const reviews = restaurant.reviews;

    // useEffect(() => {
    //     dispatch()
    // })



    return (
        <div>
            <div>
                {reviews.map(review => (
                    <div key={review.id}>{review.review}</div>
                ))}
            </div>


        </div>
    )
}




export default Reviews;