import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationIcon from '../../icons/upcoming-reservations-icon.ico';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import './ModifyReservation.css';
import { changeReservation, getAllUserReservations, getOneReservation } from "../../store/reservations";
dayjs.extend(utc);



function ModifyReservation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reservationId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const reservationsData = useSelector(state => Object.values(state.reservations));
    const reservation = reservationsData.filter(reservation => reservation.id == reservationId)[0];
    const reservationTime = dayjs(reservation?.reservation_time).format("ddd, MMMM DD h:m a");

    const previousDate = new Date(reservation?.reservation_time);

    const modifyDate = dayjs(reservation?.reservation_time).format("YYYY-MM-DD");
    const modifyTime= dayjs(reservation?.reservation_time).format("HH:mm")

    const [date, setDate] = useState(modifyDate);
    const [time, setTime] = useState(modifyTime);
    const [partySize, setPartySize] = useState(reservation?.party_size);
    const [validationErrors, setValidationErrors] = useState([]);


    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];

        if (!date) errors.push("Please select a new date");
        if (!time) errors.push("Please select a new time");
        if (dayjs(`${date} ${time}`).isBefore(dayjs())) errors.push("Please select a future time");
        if (!partySize) errors.push("Please select your party size");

        setValidationErrors(errors);

        if (!errors.length) {
            const newReservationDetails = {
                reservation_time: dayjs(`${date} ${time}`).utc().format("YYYY-MM-DD HH:mm:ss"),
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
        dispatch(getAllUserReservations(sessionUser?.id))
    }, [sessionUser])


    useEffect(() => {
        setDate(modifyDate);
        setTime(modifyTime);
        setPartySize(reservation?.party_size);
    }, [reservation])

    if (!sessionUser) {
        history.replace(`/`);
        return null;
    };

    if (!reservation) return null;


    return <div className="modify-reservation-container">
        <div className="modify-reservation-top">
            <div className="modify-reservation-header">Your current reservation</div>
            <div className="modify-reservation-image-and-details">
                <div className="modify-reservation-restaurant-image">
                    <img src={reservation.restaurant.preview_img} className="modify-reservation-preview-image" />
                </div>
                <div className="modify-reservation-name-time">
                    <div className="modify-reservation-restaurant-name">
                        <span>
                            <img src={upcomingReservationIcon} className="modify-reservation-upcoming-reservations-icon" />
                        </span>
                        
                    </div>
                    <div className="modify-reservation-reservation-time">
                        <span>{dayjs(reservation.reservation_time).format("ddd, MMM D")} IMG {dayjs(reservation.reservation_time).format("h:mm A")}
                            <span>
                                <span>
                                    <img src={personIcon} className="modify-reservation-person-icon" />
                                    {reservation.party_size} people (Standard seating)
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
                                <option value="1">1 Person</option>
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