import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantReviews } from "../../store/reviews";
import { Modal } from '../../context/Modal';
import AddReviewForm from "./AddReview";
import UpdateReviewForm from "./UpdateReviewForm";
import DeleteReview from "./DeleteReview";
import dayjs from 'dayjs';
import './Reviews.css';


function Reviews({ restaurant }) {
    const dispatch = useDispatch();
    const allReviews = restaurant.reviews;
    const sessionUser = useSelector(state => state.session.user);
    const userReservations = useSelector(state => Object.values(state.reservations));

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState({ showModal: false, reviewId: 0 });
    const [showDeleteModal, setShowDeleteModal] = useState({ showModal: false, reviewId: 0 });

    useEffect(() => {
        dispatch(getAllRestaurantReviews(restaurant.id));
    }, [])

    const openAddReviewModal = () => {
        setShowAddModal(true);
    }

    const openUpdateReviewModal = (review) => {
        setShowUpdateModal({ showModal: true, reviewId: review.id });
    }

    const openDeleteReviewModal = (review) => {
        setShowDeleteModal({ showModal: true, reviewId: review.id })
    }

    if (!sessionUser) return null;


    const currRestaurantReservations = userReservations.filter(reservation => reservation.restaurant_id === restaurant.id);
    const hasPreviousReservation = currRestaurantReservations.some(reservation => dayjs(reservation.reservation_time).isBefore(dayjs()))
    const hasPreviousReview = allReviews.some(review => review.user_id === sessionUser.id);
    const shouldShowReviewButton = (hasPreviousReservation && !hasPreviousReview);


    return (
        <div>
            <div>
                {shouldShowReviewButton &&
                    <button onClick={openAddReviewModal}>
                        Leave a review
                    </button>
                }
                {showAddModal && (
                    <Modal onClose={() => setShowAddModal(false)}>
                        <AddReviewForm setShowAddModal={setShowAddModal} restaurant={restaurant} />
                    </Modal>
                )}
            </div>
            <div>
                {allReviews.map(review => (
                    <div key={review.id} className="reviews-container">
                        <div className="review-container-left">
                            <div className="reviewer-initials-and-options">
                                <div className="reviewer-initals-container">
                                    <div className="reviewer-initials-circle">
                                    <div className="revier-initials">{review.user.first_name.slice(0, 1)}{review.user.last_name.slice(0, 1)}</div>
                                    </div>
                                </div>
                                <div>
                                    {review.user_id === sessionUser.id &&
                                        <button onClick={() => openUpdateReviewModal(review)}>
                                            Update your review
                                        </button>
                                    }
                                </div>
                                <div>
                                    {review.user_id === sessionUser.id &&
                                        <button onClick={() => openDeleteReviewModal(review)}>
                                            Delete your review
                                        </button>
                                    }
                                </div>
                            </div>
                            {showUpdateModal.showModal && showUpdateModal.reviewId === review.id && (
                                <Modal onClose={() => setShowUpdateModal({ showModal: false, reviewId: 0 })}>
                                    <UpdateReviewForm setShowUpdateModal={setShowUpdateModal} review={review} restaurant={restaurant} />
                                </Modal>
                            )}
                            {showDeleteModal.showModal && showDeleteModal.reviewId === review.id && (
                                <Modal onClose={() => setShowDeleteModal({ showModal: false, reviewId: 0 })}>
                                    <DeleteReview setShowDeleteModal={setShowDeleteModal} review={review} />
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