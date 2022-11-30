import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import reservationConfirmedIcon from '../../icons/reservation-confirmed-icon.ico';
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationsIcon from '../../icons/upcoming-reservations-icon.ico';
import reservationCompletedIcon from '../../icons/reservation-completed-icon.ico';
import './MyDiningHistory.css';
import { useEffect } from 'react';
import { getAllUserReservations } from '../../store/reservations';


function MyDiningHistory() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const allReservations = useSelector(state => Object.values(state.reservations));
    const futureReservations = allReservations.filter(reservation => dayjs().isBefore(reservation.reservation_time));
    const pastReservations = allReservations.filter(reservation => dayjs(reservation.reservation_time).isBefore(dayjs()));

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id));
    }, [allReservations])

    const routeToReservationConfirmation = (reservationId) => {
        // history.push(`/reservations/${reservationId}`)
    }

    return (
        <div className="dining-dashboard-outer-container">
            <div className="dining-dashboard-name">
                James Lee
            </div>


            <div className="dining-dashboard-container">
                <div className="dining-dashboard-left">
                    <div className="dining-dashboard-menu-options">
                        <div>Reservations</div>
                        <div>Saved Restaurant</div>
                        <div>Account Details</div>
                        <div>Preferences</div>
                        <div>Payment Methods</div>
                    </div>
                </div>

                <div className="dining-dashboard-right">
                    <div className="dining-dashboard-points-container">
                        Points
                    </div>
                    <div className="dining-dashboard-upcoming-reservations-container">
                        <div className="dining-dashboard-future-header">
                            <h1 >Upcoming reservations</h1>
                        </div>
                        {futureReservations.length > 0
                            ?
                            futureReservations.map(reservation => (
                                <div className="dining-dashboard-upcoming-border">
                                    <div className="dining-dashboard-upcoming-reservations-details-container" onClick={routeToReservationConfirmation(reservation.id)}>
                                        <div>
                                            <img src={reservation.restaurant.preview_img} className="dining-dashboard-restaurant-img" />
                                        </div>
                                        <div className="dining-dashboard-future-reservation-details">
                                            <div className="dining-dashboard-future-details-container">
                                                <div className="dining-dashboard-future-restaurant-name">
                                                    {reservation.restaurant.name}
                                                </div>
                                                <div>
                                                    <span>
                                                        <img src={reservationConfirmedIcon} className="reservation-confirmed-icon" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <span className="dining-dashboard-reservation-confirmed-text">
                                                            Reservation confirmed
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="dining-dashboard-div-align">
                                                    <span>
                                                        <img src={personIcon} className="dining-dashboard-person-icon" />
                                                        &nbsp;&nbsp;
                                                        <span className="dining-dashboard-party-size-text">
                                                            {reservation.party_size}
                                                        </span>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <img src={upcomingReservationsIcon} className="dining-dashboard-upcoming-reservations-icon" />
                                                        &nbsp;
                                                        <span className="dining-dashboard-reservation-time-text">
                                                            {dayjs(reservation.reservation_time).format("ddd, MMMM DD, h:m a")}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div>NONE</div>

                        }
                    </div>
                    <div className="dining-dashboard-past-reservations-container">
                        <div className="dining-dashboard-past-header">
                            <h1 >Past reservations</h1>
                        </div>

                        {pastReservations.length > 0
                            ?
                            pastReservations.map(reservation => (
                                <div className="dining-dashboard-past-border">
                                    <div className="dining-dashboard-past-reservations-details-container">
                                        <div>
                                            <img src={reservation.restaurant.preview_img} className="dining-dashboard-restaurant-img" />
                                        </div>
                                        <div className="dining-dashboard-past-reservation-details">
                                            <div className="dining-dashboard-past-details-container">
                                                <div className="dining-dashboard-past-restaurant-name">
                                                    {reservation.restaurant.name}
                                                </div>
                                                <div>
                                                    <span className="dining-dashboard-reservation-completed-align">
                                                        <img src={reservationCompletedIcon} className="dining-dashboard-reservation-completed-icon" />
                                                        &nbsp;&nbsp;&nbsp;
                                                        <span className="dining-dashboard-reservation-completed-text">
                                                            Reservation completed
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="dining-dashboard-reservation-time-align">
                                                    <span>
                                                        <img src={personIcon} className="dining-dashboard-person-icon" />
                                                        &nbsp;&nbsp;
                                                        <span className="dining-dashboard-party-size-text">
                                                            {reservation.party_size}
                                                        </span>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <img src={upcomingReservationsIcon} className="dining-dashboard-upcoming-reservations-icon" />
                                                        &nbsp;
                                                        <span className="dining-dashboard-reservation-time-text">
                                                            {dayjs(reservation.reservation_time).format("ddd, MMMM DD, h:m a")}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div>NONE</div>
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}


export default MyDiningHistory;