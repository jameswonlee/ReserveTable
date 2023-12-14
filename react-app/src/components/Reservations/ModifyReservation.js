import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { changeReservation, getAllUserReservations } from "../../store/reservations";
import upcomingReservationIcon from '../../icons/upcoming-reservations-icon.ico';
import upcomingNewReservationIcon from '../../icons/upcoming-reservation-icon.png';
import personIcon from '../../icons/person-icon.ico';
import clockIcon from '../../icons/clock-icon.ico';
import downCaret from '../../icons/down-caret.ico';
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
    const reservation = reservationsData.filter(reservation => reservation.id === +reservationId)[0];
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


    return (
        <div className="modify-reservation-container">
            <div className="modify-reservation-top">
                <div className="modify-reservation-header">Your current reservation</div>
                <div className="modify-reservation-image-and-details">
                    <div className="modify-reservation-restaurant-image">
                        <img src={reservation.restaurant.preview_img} className="modify-reservation-preview-image" alt="" />
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
                                    <img src={upcomingReservationIcon} className="modify-reservation-upcoming-reservations-icon" alt="" />
                                </div>
                                <div className="modify-reservation-current-reservation-date">
                                    {dayjs(reservation.reservation_time).format("ddd, MMM D")}
                                </div>
                                <div className="modify-reservation-reservation-clock-icon-container">
                                    <img src={clockIcon} className="modify-reservation-clock-icon" alt="" />
                                </div>
                                <div className="modify-reservation-current-reservation-time">
                                    {dayjs(reservation.reservation_time).format("h:mm A")}
                                </div>
                                <div className="modify-reservation-person-icon-container">
                                    <img src={personIcon} className="modify-reservation-person-icon" alt="" />
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
                <div className="modify-reservation-lower">
                    <div className="modify-reservation-form-container">
                        <div className="modify-reservation-date-container">
                            <div className="modify-reservation-new-date-icon-container">
                                <img src={upcomingNewReservationIcon} className="modify-reservation-new-date-icon" alt=""/>
                            </div>
                            <div className="modify-reservation-new-reservation-date-container">
                                <img src={downCaret} className="modify-reservation-new-reservation-date-down-caret" alt=""/>
                                <select value={date} onChange={e => setDate(e.target.value)} className="modify-reservation-new-reservation-date-select">
                                    <option value={dayjs().format("YYYY-MM-DD")}>{dayjs().format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(1, 'day').format("YYYY-MM-DD")}>{dayjs().add(1, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(2, 'day').format("YYYY-MM-DD")}>{dayjs().add(2, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(3, 'day').format("YYYY-MM-DD")}>{dayjs().add(3, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(4, 'day').format("YYYY-MM-DD")}>{dayjs().add(4, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(5, 'day').format("YYYY-MM-DD")}>{dayjs().add(5, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(6, 'day').format("YYYY-MM-DD")}>{dayjs().add(6, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(7, 'day').format("YYYY-MM-DD")}>{dayjs().add(7, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(8, 'day').format("YYYY-MM-DD")}>{dayjs().add(8, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(9, 'day').format("YYYY-MM-DD")}>{dayjs().add(9, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(10, 'day').format("YYYY-MM-DD")}>{dayjs().add(10, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(11, 'day').format("YYYY-MM-DD")}>{dayjs().add(11, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(12, 'day').format("YYYY-MM-DD")}>{dayjs().add(12, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(13, 'day').format("YYYY-MM-DD")}>{dayjs().add(13, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(14, 'day').format("YYYY-MM-DD")}>{dayjs().add(14, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(15, 'day').format("YYYY-MM-DD")}>{dayjs().add(15, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(16, 'day').format("YYYY-MM-DD")}>{dayjs().add(16, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(17, 'day').format("YYYY-MM-DD")}>{dayjs().add(17, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(18, 'day').format("YYYY-MM-DD")}>{dayjs().add(18, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(19, 'day').format("YYYY-MM-DD")}>{dayjs().add(19, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(20, 'day').format("YYYY-MM-DD")}>{dayjs().add(20, 'day').format("MMM D, YYYY")}</option>
                                    <option value={dayjs().add(21, 'day').format("YYYY-MM-DD")}>{dayjs().add(21, 'day').format("MMM D, YYYY")}</option>
                                </select>
                            </div>
                        </div>
                        <div className="modify-reservation-time-container">
                            <div className="modify-reservation-new-time-icon-container">
                                <img src={clockIcon} className="modify-reservation-new-time-icon" alt=""/>
                            </div>
                            <div>
                                <img src={downCaret} className="modify-reservation-new-reservation-time-down-caret" alt=""/>
                                <select value={time} onChange={e => setTime(e.target.value)}
                                    className="modify-reservation-new-time-select">
                                    <option value="10:00">10:00 AM</option>
                                    <option value="10:30">10:30 AM</option>
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
                            </div>
                        </div>
                        <div className="modify-reservation-party-size-container">
                            <div className="modify-reservation-new-party-size-icon-container">
                                <img src={personIcon} className="modify-reservation-new-party-size-icon" alt=""/>
                            </div>
                            <div>
                            <img src={downCaret} className="modify-reservation-new-reservation-party-size-down-caret" alt=""/>
                                <select value={partySize} onChange={e => setPartySize(e.target.value)}
                                    className="modify-reservation-new-party-size-select">
                                    <option value="1">1 person</option>
                                    <option value="2">2 people</option>
                                    <option value="3">3 people</option>
                                    <option value="4">4 people</option>
                                    <option value="5">5 people</option>
                                    <option value="6">6 people</option>
                                    <option value="7">7 people</option>
                                    <option value="8">8 people</option>
                                    <option value="9">9 people</option>
                                    <option value="10">10 people</option>
                                    <option value="11">11 people</option>
                                    <option value="12">12 people</option>
                                    <option value="13">13 people</option>
                                    <option value="14">14 people</option>
                                    <option value="15">15 people</option>
                                    <option value="16">16 people</option>
                                    <option value="17">17 people</option>
                                    <option value="18">18 people</option>
                                    <option value="19">19 people</option>
                                    <option value="20">20 people</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modify-reservation-submit-button-container">
                        <button
                            onClick={submitHandler}
                            className="modify-reservation-new-reservation-submit-button">
                            Reserve new table
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ModifyReservation;