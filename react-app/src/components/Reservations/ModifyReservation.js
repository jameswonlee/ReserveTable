import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationIcon from '../../icons/upcoming-reservations-icon.ico';

import './ModifyReservation.css';
import { changeReservation, getAllUserReservations, getOneReservation } from "../../store/reservations";



function ModifyReservation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reservationId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const reservationsData = useSelector(state => Object.values(state.reservations));
    const modifyReservation = reservationsData.filter(reservation => reservation.id == reservationId)[0];
    console.log('modifyReservation', modifyReservation);


    const previousDate = new Date(modifyReservation?.reservation_time)
    // const previousTime = new Date(modifyReservation?.reservation_time)

    const modifyDate = previousDate.getFullYear().toString().padStart(4, '0') + '-' +
        (previousDate.getMonth() + 1).toString().padStart(2, '0') + '-' + previousDate.getDate().toString().padStart(2, '0');

    // const proposedTime = previousTime.getFullYear().toString().padStart(4, '0') + '-' +
    //     (previousTime.getMonth() + 1).toString().padStart(2, '0') + '-' + previousTime.getDate().toString().padStart(2, '0');


    const [date, setDate] = useState(modifyDate);
    const [time, setTime] = useState(modifyReservation?.reservation_time);
    const [partySize, setPartySize] = useState(modifyReservation?.party_size);
    const [validationErrors, setValidationErrors] = useState([]);


    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];

        if (!date) errors.push("Please select a new date");
        if (!time) errors.push("Please select a new time");
        if (!partySize) errors.push("Please select your party size");

        setValidationErrors(errors);

        if (!errors.length) {
            const newReservationDetails = {
                reservation_time: "2022-01-01 17:00:00",
                party_size: partySize
            }

            const updatedReservation = await dispatch(changeReservation(newReservationDetails, reservationId));
            if (updatedReservation) {
                window.alert("Reservation successfully updated!");
                history.push(`/reservations/${reservationId}`)
            }
        }
    }

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id))
    }, [sessionUser])

    if (!modifyReservation) return null;


    return <div className="modify-reservation-container">
        <div className="modify-reservation-top">
            <div className="modify-reservation-header">Your current reservation</div>
            <div className="modify-reservation-image-and-details">
                <div className="modify-reservation-restaurant-image">
                    <img src={modifyReservation.restaurant.preview_img} className="modify-reservation-preview-image" />
                </div>
                <div className="modify-reservation-name-time">
                    <div className="modify-reservation-restaurant-name">
                        <span>
                            <img src={upcomingReservationIcon} className="modify-reservation-upcoming-reservations-icon" />
                        {modifyReservation.restaurant.name}
                        </span>
                        
                    </div>
                    <div className="modify-reservation-reservation-time">
                        <span>{modifyReservation.reservation_time}
                            <span> [Time]
                                <span>
                                    <img src={personIcon} className="modify-reservation-person-icon" />
                                    {modifyReservation.party_size} people (Standard seating)
                                </span>
                            </span>
                        </span>
                    </div>

                </div>
            </div>
        </div>
        <div className="modify-reservation-bottom">
            <div className="modify-reservation-bottom-header">
                Modify your reservation
            </div>
            <div className="modify-reservation-form-container">
                <form onSubmit={submitHandler} className="modify-reservation-form">
                    <div className="modify-reservation-errors-container">
                        {validationErrors.length > 0 &&
                            validationErrors.map(error =>
                                <li key={error}>{error}</li>
                            )}
                    </div>
                    <div>
                        <input
                            type="date"
                            onChange={e => setDate(e.target.value)}
                            value={date}
                            placeholder="Date"
                        />
                    </div>
                    <div>
                        <input
                            type="time"
                            onChange={e => setTime(e.target.value)}
                            value={time}
                            placeholder="Time" />
                    </div>
                    <div>
                        <label>
                            <select value={partySize} onChange={e => setPartySize(e.target.value)}>
                                {/* <option value="0">0 People</option> */}
                                <option value="1">
                                    {/* <img src={personIcon} /> */}
                                    1 Person</option>
                                <option value="2">2 People</option>
                                <option value="3">3 People</option>
                                <option value="4">4 People</option>
                                <option value="5">5 People</option>
                                <option value="6">6 People</option>
                                <option value="7">7 People</option>
                                <option value="8">8 People</option>
                                <option value="9">9 People</option>
                                <option value="10">10 People</option>
                                <option value="11">11 People</option>
                                <option value="12">12 People</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className=""
                        >
                            Find a new time
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}



export default ModifyReservation;