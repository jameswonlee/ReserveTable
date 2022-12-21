import { useDispatch } from 'react-redux';
import { getOneRestaurant } from '../../store/restaurants';
import { deleteReview } from '../../store/reviews';

import './DeleteReview.css';




function DeleteReview({ setShowDeleteModal, review }) {
    const dispatch = useDispatch();

    const deleteReviewHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(review.id));
        await dispatch(getOneRestaurant(review.restaurant_id));
        setShowDeleteModal({ showModal: false, reviewId: 0 });
    }


    return (
        <div className="delete-review-modal-container">
            <div className="delete-review-heading">
                ARE YOU SURE YOU WANT TO DELETE YOUR REVIEW?
            </div>
            <div>
                <div className="delete-review-buttons-container">
                    <button onClick={() => setShowDeleteModal(false)}className="delete-review-nevermind-button">
                        Nevermind
                    </button>
                    <button onClick={deleteReviewHandler}className="delete-review-delete-button">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}


export default DeleteReview;