import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReservation } from '../../store/reservations';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './Reservations.css';
// import './UpcomingReservationsMenu.css';

dayjs.extend(utc);


function Reservations() {
    const { restaurantId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [partySize, setPartySize] = useState(2);
    const [validationErrors, setValidationErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setValidationErrors([]);
        const errors = [];

        if (!partySize) errors.push("Please tell us how many are in your party");
        if (!date) errors.push("Please select a date");
        if (dayjs(date).isBefore(dayjs())) errors.push("Please select a future date")
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
            window.alert('Reservation successfully created!');
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
                                <li key={error}>{error}</li>
                            )}
                    </div>
                    <div className="reservation-party-size-label">
                        <div className="reservation-party-size-text">Party Size</div>
                        <div className="reservation-party-size-border-bottom">
                            <label className="reservation-party-size-select">
                                <select value={partySize} onChange={e => setPartySize(e.target.value)} className="reservation-party-size-select">
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
                    </div>
                    <div className="reservation-date-time-inputs">
                        <div className="reservation-date-input-border">
                            <div className="reservation-date-text">Date</div>
                            <input
                                type="date"
                                onChange={e => setDate(e.target.value)}
                                value={date}
                                placeholder="Date"
                                className="reservation-date-input"/>
                        </div>
                        <div className="reservation-time-input-border">
                            <div className="reservation-time-text">Time</div>
                            <input
                                type="time"
                                onChange={e => setTime(e.target.value)}
                                value={time}
                                step="1800"
                                min="17:00"
                                max="22:00"
                                placeholder="Time" 
                                className="reservation-time-input"/>
                        </div>
                    </div>
                    <div className="reservation-find-time-button-container">
                        <button
                            type="submit"
                            className="reservation-find-time-button"
                        >
                            Find a time
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}



export default Reservations;