import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReservation } from '../../store/reservations';
import { Modal } from '../../context/Modal';
import LoginForm from '../_auth/LoginForm';
import bookingSymbol from '../../icons/booking-symbol.ico';
import './Reservations.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


function Reservations({ userReservationTime, showSignInModal, setShowSignInModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { restaurantId } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const totalNumReservations = useSelector(state => state.restaurants[restaurantId].total_num_reservations);

    const [date, setDate] = useState(dayjs().add(1, "day").format("YYYY-MM-DD"));
    const [time, setTime] = useState(userReservationTime || "17:00");
    const [partySize, setPartySize] = useState(2);
    const [validationErrors, setValidationErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!sessionUser) {
            setShowSignInModal(true);
            return;
        }

        setValidationErrors([]);
        const errors = [];

        if (!partySize) errors.push("Please tell us how many are in your party");
        if (!date) errors.push("Please select a date");
        if (dayjs(`${date} ${time}`).isBefore(dayjs())) errors.push("Please select a future time");
        if (!time) errors.push("Please select a time");

        setValidationErrors(errors);

        if (!errors.length) {
            const reservationData = {
                user_id: sessionUser.id,
                restaurant_id: restaurantId,
                party_size: partySize,
                reservation_time: dayjs(`${date} ${time}`).utc().format("YYYY-MM-DD HH:mm:ss")
            }
            const newReservation = await dispatch(createReservation(reservationData, restaurantId));
            history.push(`/reservations/${newReservation.id}`);
        }
    }


    return (
        <div className="reservation-form-container">
            <form onSubmit={submitHandler}>
                <div className="reservation-form">
                    <div className="reservation-form-heading">
                        <div className="reservation-heading-font">Make a reservation</div>
                    </div>
                    <div className="reservation-errors-container">
                        {validationErrors.length > 0 &&
                            validationErrors.map(error =>
                                <div key={error} className="reservation-errors">{error}</div>
                            )}
                    </div>
                    <div className="reservation-party-size-label">
                        <div className="reservation-party-size-text">Party Size</div>
                        <div className="reservation-party-size-border-bottom">
                            <label className="reservation-party-size-select">
                                <select value={partySize} onChange={e => setPartySize(e.target.value)} className="reservation-party-size-select">
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
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="reservation-date-time-inputs">
                        <div className="reservation-date-input-border">
                            <div className="reservation-date-text">Date</div>
                            <input
                                type="date"
                                onChange={e => setDate(e.target.value)}
                                value={date}
                                placeholder="Date"
                                className="reservation-date-input" />
                        </div>
                        <div className="reservation-time-input-border">
                            <div className="reservation-time-text">Time</div>
                            <label className="reservation-time-select-label">
                                <select value={time} onChange={e => setTime(e.target.value)} className="reservation-time-select">
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
                    </div>
                    < div className="reservation-reserve-table-button-container">
                        <button
                            type="submit"
                            className="reservation-reserve-table-button"
                        >
                            Reserve Table
                        </button>
                    </div>
                    {showSignInModal && (
                        <Modal onClose={() => setShowSignInModal(false)}>
                            <LoginForm setShowSignInModal={setShowSignInModal} />
                        </Modal>
                    )}
                    <div className="reservation-booking-total-num">
                        <span className="reservation-booking-align">
                            <img src={bookingSymbol} className="reservation-booking-symbol" />
                            &nbsp;&nbsp;
                            {totalNumReservations === 1
                                ?
                                <span className="reservation-booking-text">
                                    Booked {totalNumReservations} time today
                                </span>
                                :
                                <span className="reservation-booking-text">
                                    Booked {totalNumReservations} times today
                                </span>
                            }
                        </span>
                    </div>
                </div>
            </form >
        </div >
    )
}



export default Reservations;