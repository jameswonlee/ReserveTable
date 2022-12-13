import { csrfFetch } from "./csrf";


/* ------------------------------------- Action Types ---------------------------------- */

const LOAD_ALL_USER_RESERVATIONS = '/reservations/LOAD_ALL_USER_RESERVATIONS'
const LOAD_ONE_RESERVATION = '/reservations/LOAD_ONE_RESERVATION'
const ADD_RESERVATION = '/reservations/ADD_RESERVATION'
const UPDATE_RESERVATION = '/reservations/UPDATE_RESERVATION'
const DELETE_RESERVATION = '/reservations/DELETE_RESERVATION'
const RESET_RESERVATIONS = '/reservations/RESET_RESERVATIONS'


/* ------------------------------------ Action Creators --------------------------------- */

const loadAllUserReservations = (reservations) => {
    return {
        type: LOAD_ALL_USER_RESERVATIONS,
        reservations: reservations
    }
}

const loadOneReservation = (reservation) => {
    return {
        type: LOAD_ONE_RESERVATION,
        reservation: reservation
    }
}

const addReservation = (reservation) => {
    return {
        type: ADD_RESERVATION,
        reservation: reservation
    }
}

const updateReservation = (reservation) => {
    return {
        type: UPDATE_RESERVATION,
        reservation: reservation
    }
}

const removeReservation = (reservationId) => {
    return {
        type: DELETE_RESERVATION,
        reservationId: reservationId
    }
}

export const resetReservations = () => {
    return {
        type: RESET_RESERVATIONS
    }
}


/* ---------------------------------- Thunk Action Creators ---------------------------- */


export const getAllUserReservations = (userId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/users/${userId}/reservations`);
    
        if (response.ok) {
            const reservations = await response.json();
            dispatch(loadAllUserReservations(reservations));
            return reservations
        }

    } catch (e) {

    }
}

export const getOneReservation = (reservationId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`);

    if (response.ok) {
        const reservation = await response.json();
        dispatch(loadOneReservation(reservation));
        return reservation
    }
}

export const createReservation = (newReservationData, restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservationData)
    })

    if (response.ok) {
        const newReservation= await response.json();
        dispatch(addReservation(newReservation));
        return newReservation;
    }
}

export const changeReservation = (updatedReservationData, reservationId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReservationData) 
    })

    if (response.ok) {
        const updatedReservation = await response.json()
        dispatch(updateReservation(updatedReservation));
        return updatedReservation
    }
}

export const deleteReservation = (reservationId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const message = await response.json();
        dispatch(removeReservation(reservationId));
        return message;
    }
}


/* -------------------------------------- Reducer --------------------------------------- */

const initialState = {};

const reservationsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_ALL_USER_RESERVATIONS:
            newState = { ...state }
            action.reservations.Reservations?.forEach(reservation => {
                newState[reservation.id] = reservation
            })
            return newState;

        case LOAD_ONE_RESERVATION:
            let newReservation = {};
            newReservation[action.reservation.id] = action.reservation;
            newState = { ...state, ...newReservation };
            return newState;

        case ADD_RESERVATION:
            newState = { ...state };
            newState[action.reservation.id] = action.reservation;
            return newState
            
        case UPDATE_RESERVATION:
            newState = { ...state };
            newState[action.reservation.id] = action.reservation;
            return newState

        case DELETE_RESERVATION:
            newState = { ...state };
            delete newState[action.reservationId];
            return newState;

        case RESET_RESERVATIONS:
            newState = {}
            return newState;

        default:
            return state;
    }
}


export default reservationsReducer;