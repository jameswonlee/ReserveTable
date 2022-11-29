import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantReviews } from "../../store/reviews";
import { Modal } from '../../context/Modal';
import AddReviewForm from "./AddReview";
import UpdateReviewForm from "./UpdateReviewForm";
import DeleteReview from "./DeleteReview";
import './Reviews.css';


function Reviews({ restaurant }) {
    const dispatch = useDispatch();
    const allReviews = restaurant.reviews;
    const sessionUser = useSelector(state => state.session.user);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(getAllRestaurantReviews(restaurant.id));
    }, [])

    const openAddReviewModal = () => {
        setShowAddModal(true);
    }

    const openUpdateReviewModal = () => {
        setShowUpdateModal(true);
    }

    const openDeleteReviewModal = () => {
        setShowDeleteModal(true)
    }

    if (!sessionUser) return null;

    return (
        <div>
            <div>
                <button onClick={openAddReviewModal}>
                    Leave a review
                </button>
                {showAddModal && (
                    <Modal onClose={() => setShowAddModal(false)}>
                        <AddReviewForm setShowAddModal={setShowAddModal} restaurant={restaurant} />
                    </Modal>
                )}
            </div>
            <div>
                {allReviews.map(review => (
                    <div className="reviews-container">
                        <div className="review-container-left">
                            <div>
                                <div>
                                    REVIEWER NAME
                                </div>
                                {review.user_id === sessionUser.id &&
                                    <button onClick={openUpdateReviewModal}>
                                        Update your review
                                    </button>
                                }
                                 {review.user_id === sessionUser.id &&
                                    <button onClick={openDeleteReviewModal}>
                                        Delete your review
                                    </button>
                                }
                            </div>
                            {showUpdateModal && (
                                <Modal onClose={() => setShowUpdateModal(false)}>
                                    <UpdateReviewForm setShowUpdateModal={setShowUpdateModal} restaurant={restaurant} />
                                </Modal>
                            )}
                            {showDeleteModal && (
                                <Modal onClose={() => setShowDeleteModal(false)}>
                                    <DeleteReview setShowDeleteModal={setShowDeleteModal}/>
                                </Modal>
                            )}
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