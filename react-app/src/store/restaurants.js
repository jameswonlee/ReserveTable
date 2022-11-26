import { csrfFetch } from "./csrf";


/* ------------------------------- Action Types --------------------------- */

const LOAD_ALL_RESTAURANTS = '/restaurants/LOAD_ALL_RESTAURANTS'
const LOAD_ONE_RESTAURANT = '/restaurants/LOAD_ONE_RESTAURANT'


/* ------------------------------ Action Creators -------------------------- */

const loadAllRestaurants = (restaurants) => {
    return {
        type: LOAD_ALL_RESTAURANTS,
        restaurants: restaurants
    }
}

const loadOneRestaurant = (restaurant) => {
    return {
        type: LOAD_ONE_RESTAURANT,
        restaurant: restaurant
    }
}


/* ---------------------------- Thunk Action Creators ----------------------- */

export const getAllRestaurants = () => async (dispatch) => {
    const response = await csrfFetch('/api/restaurants');
    
    if (response.ok) {
        const restaurants = await response.json();
        dispatch(loadAllRestaurants(restaurants));
        return restaurants
    }
    
}

export const getOneRestaurant = (restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}`);
    
    if (response.ok) {
        const restaurant = await response.json();
        dispatch(loadOneRestaurant(restaurant))
        return restaurant;
    }
}


/* ---------------------------------- Reducer -------------------------------- */

const initialState = {};

const restaurantsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        
        case LOAD_ALL_RESTAURANTS:
            let newRestaurants = {};
            action.restaurants.Restaurants.forEach(restaurant => {
                newRestaurants[restaurant.id] = restaurant
            })
            newState = { ...state, ...newRestaurants };
            return newState
            
            case LOAD_ONE_RESTAURANT:
                let newRestaurant = {};
                newRestaurant[action.restaurant.id] = action.restaurant
                newState = { ...state, ...newRestaurant }
            return newState

        default:
            return state;
    }
}



export default restaurantsReducer