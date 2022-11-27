import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReservation } from '../../store/reservations';



function Reservations() {
    const { restaurantId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [partySize, setPartySize] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setValidationErrors([]);
        const errors = [];

        console.log('time', time);
        console.log('date', date);

        if (!partySize) errors.push("Please indicate your party size");
        if (!date) errors.push("Please select a date");
        if (!time) errors.push("Please select a time");

        setValidationErrors(errors);

        if (!errors.length) {
            const newReservationData = {
                user_id: sessionUser.id,
                restaurant_id: restaurantId,
                party_size: partySize,
                // reservation_time: "2024-01-21 17:30:00"
            }
            await dispatch(createReservation(newReservationData, restaurantId))

        }
    }



    return (
        <div className="reservation-form-container">
            <form onSubmit={submitHandler}>
                <h2 className="reservation-form-heading">MAKE A RESERVATION</h2>
                <div className="reservation-errors-container">
                    {validationErrors.length > 0 &&
                        validationErrors.map(error =>
                            <li key={error}>{error}</li>
                        )}
                </div>
                <div>
                    <input
                        type="select"
                        onChange={e => setPartySize(e.target.value)}
                        placeholder="Party Size"
                    />
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
                    <button
                        type="submit"
                        className=""
                    >
                        Find a time
                    </button>
                </div>
            </form>
        </div>
    )
}



export default Reservations;