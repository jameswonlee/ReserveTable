import { csrfFetch } from "./csrf";


/* ---------------------------- Action Types ----------------------- */

const LOAD_ALL_SAVED_RESTAURANTS = '/savedRestaurants/LOAD_ALL_SAVED_RESTAURANTS'
const ADD_SAVED_RESTAURANT = '/savedRestaurants/ADD_SAVED_RESTAURANT'
const REMOVE_SAVED_RESTAURANT = '/savedRestaurants/REMOVE_SAVED_RESTAURANT'


/* -------------------------- Action Creators ----------------------- */

const loadAllSavedRestaurants = (restaurants) => {
    return {
        type: LOAD_ALL_SAVED_RESTAURANTS,
        savedRestaurants: restaurants
    }
}

const addSavedRestaurant = (restaurant) => {
    return {
        type: ADD_SAVED_RESTAURANT,
        savedRestaurant: restaurant
    }
}

const removeSavedRestaurant = (restaurantId) => {
    return {
        type: REMOVE_SAVED_RESTAURANT,
        restaurantId: restaurantId
    }
}


/* ------------------------- Thunk Action Creators ------------------- */

export const getAllSavedRestaurants = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/saved-restaurants`);

    if (response.ok) {
        const restaurants = await response.json();
        dispatch(loadAllSavedRestaurants(restaurants));
        return restaurants;
    }
}

export const createSavedRestaurant = (userId, restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/saved-restaurants/${restaurantId}`, {
        method: 'POST'
    })

    if (response.ok) {
        const restaurant = await response.json();
        console.log('restaurant', restaurant)
        dispatch(addSavedRestaurant(restaurant));
        return restaurant;
    }
}

export const deleteSavedRestaurant = (userId, restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/saved-restaurants/${restaurantId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const message = await response.json();
        dispatch(removeSavedRestaurant(restaurantId));
        return message;
    }
}


/* ------------------------------- Reducer --------------------------- */

const initialState = {};

const savedRestaurantsReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {

        case LOAD_ALL_SAVED_RESTAURANTS:
            newState = { ...state };
            action.savedRestaurants.SavedRestaurants.forEach(restaurant => {
                newState[restaurant.restaurant_id] = restaurant
            })
            return newState;

        case ADD_SAVED_RESTAURANT:
            newState = { ...state };
            newState[action.savedRestaurant.restaurant_id] = action.savedRestaurant;
            return newState;

        case REMOVE_SAVED_RESTAURANT:
            newState = { ...state };
            delete newState[action.restaurantId];
            return newState;

        default:
            return state;
    }
}


export default savedRestaurantsReducer;