import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantReviews } from "../../store/reviews";
import { Modal } from '../../context/Modal';
import AddReviewForm from "./AddReview";

import './Reviews.css';







function Reviews({ restaurant }) {
    const dispatch = useDispatch();
    const allReviews = restaurant.reviews;

    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        dispatch(getAllRestaurantReviews(restaurant.id));
    }, [])

    const openReviewModal = () => {
        setShowModal(true)
    }



    return (
        <div>
            <div>
                <button onClick={openReviewModal}>
                    Leave a review
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    <AddReviewForm setShowModal={setShowModal} restaurant={restaurant}/>
                </Modal>
                )}
            </div>
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