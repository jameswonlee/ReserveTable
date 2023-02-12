import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { createReservation } from '../../store/reservations';
import { Modal } from '../../context/Modal';
import LoginForm from '../_auth/LoginForm';
import bookingSymbol from '../../icons/booking-symbol.ico';
import downCaret from '../../icons/down-caret.ico';
import './Reservations.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


function Reservations({ userReservationTime, showSignInModal, setShowSignInModal }) {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchDate = params.get('date');
    const searchTime = params.get('time');
    const searchPartySize = params.get('partySize');

    const sessionUser = useSelector(state => state.session.user);
    const totalNumReservations = useSelector(state => state.restaurants[restaurantId].total_num_reservations);

    const [date, setDate] = useState(searchDate || dayjs().format("YYYY-MM-DD"));
    const [time, setTime] = useState(searchTime || userReservationTime || "17:00");
    const [partySize, setPartySize] = useState(searchPartySize || 2);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        if (params.get("date") && params.get("time") && params.get("partySize")) {
            window.scrollTo({
                top: 500,
                behavior: 'smooth'
            });
        }
    }, [params])


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!sessionUser) {
            setShowSignInModal(true);
            return;
        }

        setValidationErrors([]);
        const errors = [];

        if (!partySize) errors.push("Please select party size");
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
                            <div className="reservation-party-size-select">
                                <img src={downCaret} className="reservation-down-caret" />
                                <select value={partySize} onChange={e => {
                                    setValidationErrors([]);
                                    setPartySize(e.target.value)
                                }} className="reservation-party-size-select">
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
                    <div className="reservation-date-time-inputs">
                        <div className="reservation-date-input-border">
                            <div className="reservation-date-text">Date</div>
                            <div className="reservation-date">
                                {/* <img src={downCaret} className="reservation-date-down-caret" /> */}
                                <input
                                    type="date"
                                    onChange={e => {
                                        setValidationErrors([]);
                                        setDate(e.target.value)
                                    }}
                                    value={date}
                                    min={dayjs().format("YYYY-MM-DD")}
                                    max={dayjs().add(6, 'months').format("YYYY-MM-DD")}
                                    placeholder="Date"
                                    className="reservation-date-input" />
                            </div>
                        </div>
                        <div className="reservation-time-input-border">
                            <div className="reservation-time-text">Time</div>
                            <div className="reservation-time">
                                <img src={downCaret} className="reservation-time-down-caret" />
                                <select value={time} className="reservation-time-select" onChange={e => {
                                    setValidationErrors([])
                                    setTime(e.target.value)
                                }}>
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
                            <img src={bookingSymbol} alt="" className="reservation-booking-symbol" />
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