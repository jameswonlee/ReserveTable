import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { changeReservation, getAllUserReservations } from "../../store/reservations";
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationIcon from '../../icons/upcoming-reservations-icon.ico';
import clockIcon from '../../icons/clock-icon.ico';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './ModifyReservation.css';
dayjs.extend(utc);



function ModifyReservation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reservationId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const reservationsData = useSelector(state => Object.values(state.reservations));
    const reservation = reservationsData.filter(reservation => reservation.id == reservationId)[0];
    // const reservationTime = dayjs(reservation?.reservation_time).format("ddd, MMMM DD h:m a");

    // const previousDate = new Date(reservation?.reservation_time);

    const modifyDate = dayjs(reservation?.reservation_time).format("YYYY-MM-DD");
    const modifyTime = dayjs(reservation?.reservation_time).format("HH:mm")

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
                history.push(`/reservations/${reservationId}`)
            }
        }
    }

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser?.id))
    }, [dispatch, sessionUser])


    useEffect(() => {
        setDate(modifyDate);
        setTime(modifyTime);
        setPartySize(reservation?.party_size);
    }, [modifyDate, modifyTime, reservation])

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
                    <img src={reservation.restaurant.preview_img} className="modify-reservation-preview-image" alt=""/>
                </div>
                <div className="modify-reservation-name-time">
                    <div className="modify-reservation-restaurant-name">
                        <div className="modify-reservation-restaurant-name-text">
                            {reservation.restaurant.name}
                        </div>
                    </div>
                    <div className="modify-reservation-reservation-time-container">
                        <span className="modify-reservation-reservation-time">
                            <div>
                                <img src={upcomingReservationIcon} className="modify-reservation-upcoming-reservations-icon" alt=""/>
                            </div>
                            <div className="modify-reservation-current-reservation-date">
                                {dayjs(reservation.reservation_time).format("ddd, MMM D")}
                            </div>
                            <div className="modify-reservation-reservation-clock-icon-container">
                                <img src={clockIcon} className="modify-reservation-clock-icon" alt=""/>
                            </div>
                            <div className="modify-reservation-current-reservation-time">
                                {dayjs(reservation.reservation_time).format("h:mm A")}
                            </div>
                            <div className="modify-reservation-person-icon-container">
                                <img src={personIcon} className="modify-reservation-person-icon" alt=""/>
                            </div>
                            <div className="modify-reservation-current-party-size">
                                {reservation.party_size} people (Standard seating)
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="modify-reservation-bottom">
            <div className="modify-reservation-bottom-header">
                Modify your reservation
            </div>
            <div className="modify-reservation-errors-container">
                {validationErrors.length > 0 &&
                    validationErrors.map(error =>
                        <div key={error}>{error}</div>
                    )}
            </div>
            <div className="modify-reservation-form-container">
                <form onSubmit={submitHandler} className="modify-reservation-form">
                    <div className="modify-reservation-form-inputs">
                        <div className="modify-reservation-new-date">
                            <input
                                type="date"
                                onChange={e => setDate(e.target.value)}
                                value={date}
                                placeholder="Date"
                                className="modify-reservation-new-date-input"
                            />
                        </div>
                        <div>
                            <label className="reservation-time-select-label">
                                <select value={time} onChange={e => setTime(e.target.value)} className="modify-reservation-new-time-input">
                                    <option value="11:00">11:00 AM</option>
                                    <option value="11:30">11:30 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="12:30">12:30 PM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="13:30">1:30 PM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="14:30">2:30 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                    <option value="15:30">3:30 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                    <option value="16:30">4:30 PM</option>
                                    <option value="17:00">5:00 PM</option>
                                    <option value="17:30">5:30 PM</option>
                                    <option value="18:00">6:00 PM</option>
                                    <option value="18:30">6:30 PM</option>
                                    <option value="19:00">7:00 PM</option>
                                    <option value="19:30">7:30 PM</option>
                                    <option value="20:00">8:00 PM</option>
                                    <option value="20:30">8:30 PM</option>
                                    <option value="21:00">9:00 PM</option>
                                    <option value="21:30">9:30 PM</option>
                                    <option value="22:00">10:00 PM</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                <select value={partySize} onChange={e => setPartySize(e.target.value)} className="modify-reservation-new-party-size">
                                    <option value="1">1 Person </option>
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
                                className="modify-reservation-new-reservation-submit-button"
                            >
                                Reserve new table
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
}



export default ModifyReservation;