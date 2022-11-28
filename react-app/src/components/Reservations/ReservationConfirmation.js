import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUserReservations } from "../../store/reservations";
import './ReservationConfirmation.css';



function ReservationConfirmation() {
    const dispatch = useDispatch();
    const { reservationId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const allReservations = useSelector(state => Object.values(state.reservations));
    const reservation = allReservations.filter(reservation => reservation.id == reservationId)[0];
    console.log('reservation', reservation)

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id))
    }, [])

    if (!reservation) return null;


    return (
        <div className="reservation-details-outer-container">
            <div className="reservation-confirmation-details-left">
                <div className="reservation-restaurant-image">
                    <img />
                </div>
                <div className="reservation-restaurant-name-options">
                    <div>
                        {reservation.restaurant.name}
                    </div>
                    <div>
                        <span>
                            <img className="reservation-confirmed-check-mark" />
                            <div>Reservation confirmed</div>
                        </span>
                    </div>
                    <div>
                        <span>
                            <img className="standars-seating-icon"/>
                            <div>{reservation.party_size} (Standard seating)</div>
                            <img className="reservation-details-date-time"/>
                            <div>{reservation.reservation_time.split(':00 GMT')}</div>
                        </span>
                    </div>
                    <div className="modify-cancel-add-to-calendar-buttons">
                        <span>
                            <button>Modify</button>
                            <img />
                            <button>Cancel</button>
                            <img />
                            <button>Add to calendar</button>
                        </span>
                    </div>
                </div>
            </div>

            <div className="reservation-confirmation-details-right">
                <div className="user-info-details-container">
                    <div>{sessionUser.first_name} {sessionUser.last_name}</div>
                </div>
            </div>
        </div>
    )
}


export default ReservationConfirmation;