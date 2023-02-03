import { csrfFetch } from "./csrf";


/* ----------------------------- Action Types -------------------------- */

const LOAD_ALL_RESTAURANT_REVIEWS = '/reviews/LOAD_ALL_RESTAURANT_REVIEWS'
const LOAD_ALL_USER_REVIEWS = '/reviews/LOAD_ALL_USER_REVIEWS'
const ADD_REVIEW = '/reviews/ADD_REVIEW'
const UPDATE_REVIEW = '/reviews/UPDATE_REVIEW'
const DELETE_REVIEW = '/reviews/DELETE_REVIEW'
const RESET_REVIEWS = '/reviews/RESET_REVIEWS'


/* ----------------------------- Action Creators ------------------------ */

const loadAllRestaurantReviews = (reviews) => {
    return {
        type: LOAD_ALL_RESTAURANT_REVIEWS,
        reviews: reviews
    }
}

const loadAllUserReviews = (reviews) => {
    return {
        type: LOAD_ALL_USER_REVIEWS,
        reviews: reviews
    }
}

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review: review
    }
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review: review
    }
}

const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId: reviewId
    }
}

export const resetReviews = () => {
    return {
        type: RESET_REVIEWS
    }
}


/* ---------------------------- Thunk Action Creators ----------------------- */


export const getAllRestaurantReviews = (restaurantId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/reviews`);

        if (response.ok) {
            const reviews = await response.json();
            dispatch(loadAllRestaurantReviews(reviews));
            return reviews;
        }
    } catch(e) {

    }
}

export const getUserReviews = (userId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/users/${userId}/reviews`);

        if (response.ok) {
            const reviews = await response.json();
            dispatch(loadAllUserReviews(reviews));
            return reviews;
        }
    } catch(e) {

    }
}

export const createReview = (reviewData, restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
    })

    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
        return newReview;
    }
}

export const editReview = (reviewData, reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(updateReview(review));
        return review;
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const message = await response.json();
        dispatch(removeReview(reviewId));
        return message;
    }
}

/* -------------------------------- Reducer ------------------------- */

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_ALL_RESTAURANT_REVIEWS:
            // newState = { ...state };
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState;

        case LOAD_ALL_USER_REVIEWS:
            // newState = { ...state }
            newState = {};
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState;

        case ADD_REVIEW:
            newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;

        case UPDATE_REVIEW:
            newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;

        case DELETE_REVIEW:
            newState = { ...state };
            delete newState[action.reviewId];
            return newState;

        case RESET_REVIEWS:
            newState = {};
            return newState;

        default:
            return state;
    }
}


export default reviewsReducer;