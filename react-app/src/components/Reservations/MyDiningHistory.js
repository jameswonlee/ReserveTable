import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllUserReservations } from '../../store/reservations';
import reservationConfirmedIcon from '../../icons/reservation-confirmed-icon.ico';
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationsIcon from '../../icons/upcoming-reservations-icon.ico';
import reservationCompletedIcon from '../../icons/reservation-completed-icon.ico';
import newIcon from '../../icons/new-icon.ico';
import pointsGraph from '../../icons/points-graph-icon.ico';
import dayjs from 'dayjs';
import './MyDiningHistory.css';


function MyDiningHistory() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const allReservations = useSelector(state => Object.values(state.reservations));
    const futureReservations = allReservations
        .filter(reservation => dayjs().isBefore(reservation.reservation_time))
        .sort((reservationA, reservationB) => {
            return dayjs(reservationA.reservation_time).valueOf() - dayjs(reservationB.reservation_time).valueOf()
        });

    const pastReservations = allReservations
        .filter(reservation => dayjs(reservation.reservation_time).isBefore(dayjs()))
        .sort((reservationA, reservationB) => {
            return dayjs(reservationA.reservation_time).valueOf() - dayjs(reservationB.reservation_time).valueOf()
        });

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser?.id));
    }, [dispatch, sessionUser?.id]);

    const routeToReservationConfirmation = (reservationId) => {
        history.push(`/reservations/${reservationId}`)
    }

    if (!sessionUser) {
        history.replace(`/`);
        return null;
    };

    return (
        <div className="dining-dashboard-outer-container">
            <div className="dining-dashboard-name">
                <div className="dining-dashboard-name-text">
                    {sessionUser.first_name} {sessionUser.last_name}
                </div>
                <div className="dining-dashboard-points-text">
                    0 points
                </div>
            </div>
            <div className="dining-dashboard-container">
                <div className="dining-dashboard-left">
                    <div className="dining-dashboard-menu-options">
                        <div className="dining-dashboard-space-to-top first-item">Reservations</div>
                        <div className="dining-dashboard-space-to-top not-first-item">Saved Restaurant</div>
                        <div className="dining-dashboard-space-to-top not-first-item">Account Details <img src={newIcon} className="dining-history-new-icon" /></div>
                        <div className="dining-dashboard-space-to-top not-first-item">Preferences</div>
                        <div className="dining-dashboard-space-to-top not-first-item">Payment Methods</div>
                    </div>
                </div>
                <div className="dining-dashboard-right">
                    <div className="dining-dashboard-points-container">
                        <div className="dining-dashboard-points-text-container">
                            <div className="dining-dashboard-points-text2">
                                Points
                            </div>
                            <div className="dining-dashboard-your-points-text">
                                Your Points: 0 PTS
                            </div>
                        </div>
                        <div className="dining-dashboard-points-middle-container">
                            <div className="dining-dashboard-points-middle-left">
                                <div className="dining-dashboard-points-middle-earned-text">
                                    Earned
                                </div>
                                <div className="dining-dashboard-points-middle-points">
                                    <span className="dining-dashboard-0">0<span className="dining-dashboard-points-PTS"> PTS</span></span>
                                </div>
                            </div>
                            <div className="dining-dashboard-points-middle-right">
                                <div className="dining-dashboard-next-reward-text">
                                    Next Reward
                                </div>
                                <div className="dining-dashboard-points-total-container">
                                    <span className="dining-dashboard-points-total">1,000<span className="dining-dashboard-points-PTS2"> PTS</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="dining-dashboard-points-graph-container">
                            <img src={pointsGraph} className="dining-dashboard-points-graph-icon" />
                        </div>
                        <div className="dining-dashboard-points-reward-text">
                            <div className="dining-dashboard-points-text-space-below">You are only 1,000 points away from a $20 reward!</div>
                            <div className="dining-dashboard-under-points-border-bottom-line"></div>
                        </div>
                        <div className="dining-dashboard-learn-more-rewards-container">
                            <div className="dining-dashboard-learn-more-rewards-text">
                                Learn more about ReserveTable Rewards
                            </div>
                        </div>
                    </div>
                    <div className="dining-dashboard-upcoming-reservations-container">
                        <div className="dining-dashboard-future-header">
                            <h1 >Upcoming reservations</h1>
                        </div>
                        {futureReservations.length > 0
                            ?
                            futureReservations.map(reservation => (
                                <div key={reservation.id} className="dining-dashboard-upcoming-border">
                                    <div className="dining-dashboard-upcoming-reservations-details-container" onClick={(e) => routeToReservationConfirmation(reservation.id)}>
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
                                                            {dayjs(reservation.reservation_time).format("ddd, MMM D, h:mm A")}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="dining-history-none-container">
                                <div className="dining-history-none-text">
                                    You have no upcoming reservations
                                </div>
                            </div>

                        }
                    </div>
                    <div className="dining-dashboard-past-reservations-container">
                        <div className="dining-dashboard-past-header">
                            <h1>Past reservations</h1>
                        </div>

                        {pastReservations.length > 0
                            ?
                            pastReservations.map(reservation => (
                                <div key={reservation.id} className="dining-dashboard-past-border">
                                    <div className="dining-dashboard-past-reservations-details-container"
                                        // onClick={(e) => routeToReservationConfirmation(reservation.id)}
                                    >
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
                                                            {dayjs(reservation.reservation_time).format("ddd, MMMM DD, h:mm A")}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="dining-history-none-container">
                                <div className="dining-history-none-text">
                                    You have no past reservations
                                </div>
                            </div>
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}


export default MyDiningHistory;