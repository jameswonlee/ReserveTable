import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import upcomingReservationsIcon from '../../icons/upcoming-reservations-icon.ico';
import { deleteReservation } from '../../store/reservations';
import personIcon from '../../icons/person-icon.ico';
import xIcon from '../../icons/x-icon.ico';
import dayjs from 'dayjs';
import './CancelReservation.css';


function CancelReservation({ reservation, setShowCancelModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteReservationHandler = () => {
        dispatch(deleteReservation(reservation.id));
        history.push(`/`)
    }

    const routeToReservationConfirmation = () => {
        history.replace(`/reservations/${reservation.id}`);
    }

    return (
        <div>
            <img src={xIcon} className="cancel-reservation-modal-x" alt="" onClick={routeToReservationConfirmation} />
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
                            <img src={personIcon} className="reservation-cancellation-person-icon" alt=""/>
                        </span>
                        <span>
                            {reservation.party_size} (Standard seating)
                        </span>
                        &nbsp;
                        <span>
                            <img src={upcomingReservationsIcon} className="reservation-cancellation-upcoming-reservations-icon" alt=""/>
                        </span>
                        <span>
                            {dayjs(reservation.reservation_time).format("ddd, MMM D [at] h:mm A")}
                        </span>
                    </span>
                </div>
            </div>
            <div className="cancel-reservation-modal-buttons">
                <span>
                    <button onClick={routeToReservationConfirmation} className="reservation-cancel-modal-nevermind-button">
                        Nevermind
                    </button>
                    <button onClick={deleteReservationHandler} className="reservation-cancel-modal-cancel-button">
                        Confirm cancellation
                    </button>
                </span>
            </div>
        </div>
    )
}


export default CancelReservation;