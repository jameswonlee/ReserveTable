import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationsIcon from '../../icons/upcoming-reservations-icon.ico';
import { deleteReservation } from '../../store/reservations';
import './CancelReservation.css';




function CancelReservation({ reservation, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log('reservation', reservation);

    const deleteReservationHandler = () => {
        dispatch(deleteReservation(reservation.id));
        alert("Reservation successfully delete");
        history.push(`/`)
    }

    return (
        <>
            <div className="cancel-reservation-modal-container">
                <div className="cancellation-heading">
                    Are you sure you want to cancel this reservation?
                </div>
                <div className="cancel-reservation-restaurant-name">
                    {reservation.restaurant.name}
                </div>
                <div className="cancel-reservation-modal-time">
                    <span>
                        <span className="reservation-cancellation-person-icon-container">
                            <img src={personIcon} className="reservation-cancellation-person-icon" />
                        </span>
                        <span>
                            {reservation.party_size} (Standard seating)
                        </span>
                        <span>
                            <img src={upcomingReservationsIcon} className="reservation-cancellation-upcoming-reservations-icon" />
                        </span>
                        <span>
                            {reservation.reservation_time}
                        </span>

                    </span>
                </div>
            </div>
            <div className="cancel-reservation-modal-buttons">
                <span>
                    <button onClick={() => setShowModal(false)}>
                        Nevermind
                    </button>
                    <button onClick={deleteReservationHandler}>
                        Confirm cancellation
                    </button>
                </span>
            </div>
        </>
    )
}


export default CancelReservation;