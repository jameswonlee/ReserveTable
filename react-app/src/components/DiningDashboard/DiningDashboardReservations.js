import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllUserReservations } from '../../store/reservations';
import { getUserReviews } from '../../store/reviews';
import reservationConfirmedIcon from '../../icons/reservation-confirmed-icon.ico';
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationsIcon from '../../icons/upcoming-reservations-icon.ico';
import reservationCompletedIcon from '../../icons/reservation-completed-icon.ico';
import pointsGraph from '../../icons/points-graph-icon.ico';
import './DiningDashboardReservations.css';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


function DiningDashboardReservations() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const allReservations = useSelector(state => Object.values(state.reservations));
    const userReviews = useSelector(state => Object.values(state.reviews));

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
        dispatch(getUserReviews(sessionUser?.id));
    }, [dispatch, sessionUser?.id]);

    if (!userReviews) return null;

    const routeToReservationConfirmation = (reservationId) => {
        history.push(`/reservations/${reservationId}`)
    }


    return (
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
                    <img src={pointsGraph} alt="" className="dining-dashboard-points-graph-icon" />
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
                    <h1>Upcoming reservations</h1>
                </div>
                {futureReservations.length > 0
                    ?
                    futureReservations.map(reservation => (
                        <div key={reservation.id} className="dining-dashboard-upcoming-border">
                            <div className="dining-dashboard-upcoming-reservations-details-container" onClick={(e) => routeToReservationConfirmation(reservation.id)}>
                                <div>
                                    <img src={reservation.restaurant.preview_img} alt="" className="dining-dashboard-restaurant-img" />
                                </div>
                                <div className="dining-dashboard-future-reservation-details">
                                    <div className="dining-dashboard-future-details-container">
                                        <div className="dining-dashboard-future-restaurant-name">
                                            {reservation.restaurant.name}
                                        </div>
                                        <div className="dining-dashboard-reservation-confirmed-container">
                                            <span>
                                                <img src={reservationConfirmedIcon} alt="" className="reservation-confirmed-icon" />
                                                &nbsp;&nbsp;&nbsp;
                                                <span className="dining-dashboard-reservation-confirmed-text">
                                                    Reservation confirmed
                                                </span>
                                            </span>
                                        </div>
                                        <div className="dining-dashboard-party-date-container">
                                            <span>
                                                <img src={personIcon} alt="" className="dining-dashboard-person-icon" />
                                                &nbsp;&nbsp;
                                                <span className="dining-dashboard-party-size-text">
                                                    {reservation.party_size}
                                                </span>
                                                &nbsp;&nbsp;&nbsp;
                                                <img src={upcomingReservationsIcon} alt="" className="dining-dashboard-upcoming-reservations-icon" />
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
                                onClick={(e) => routeToReservationConfirmation(reservation.id)}>
                                <div>
                                    <img src={reservation.restaurant.preview_img} alt="" className="dining-dashboard-restaurant-img" />
                                </div>
                                <div className="dining-dashboard-past-reservation-details">
                                    <div className="dining-dashboard-past-details-container">
                                        <div className="dining-dashboard-past-restaurant-name">
                                            {reservation.restaurant.name}
                                        </div>
                                        <div className="dining-dashboard-reservation-completed-container">
                                            <span className="dining-dashboard-reservation-completed-align">
                                                <img src={reservationCompletedIcon} alt="" className="dining-dashboard-reservation-completed-icon" />
                                                &nbsp;&nbsp;&nbsp;
                                                <span className="dining-dashboard-reservation-completed-text">
                                                    Reservation completed
                                                </span>
                                            </span>
                                        </div>
                                        <div className="dining-dashboard-past-reservation-time-align">
                                            <span>
                                                <img src={personIcon} alt="" className="dining-dashboard-person-icon" />
                                                &nbsp;&nbsp;
                                                <span className="dining-dashboard-party-size-text">
                                                    {reservation.party_size}
                                                </span>
                                                &nbsp;&nbsp;&nbsp;
                                                <img src={upcomingReservationsIcon} alt="" className="dining-dashboard-upcoming-reservations-icon" />
                                                &nbsp;
                                                <span className="dining-dashboard-reservation-time-text">
                                                    {dayjs(reservation.reservation_time).format("MMM DD[,] YYYY")}
                                                </span>
                                            </span>
                                        </div>
                                        {userReviews.find(review => review.restaurant_id === reservation.restaurant_id)
                                            ?
                                            <div className="dining-dashboard-past-reservations-rating-container">
                                                <div className="dining-dashboard-past-reservations-rating-text">
                                                    Your rating
                                                </div>
                                                <div className="dining-dashboard-review-rating-stars">
                                                    {userReviews.find(review => review.restaurant_id === reservation.restaurant_id).rating === 1 &&
                                                        <span className="red-star review-star">★ <span className="gray-star review-star">★ ★ ★ ★</span></span>}
                                                    {userReviews.find(review => review.restaurant_id === reservation.restaurant_id).rating === 2 &&
                                                        <span className="red-star review-star">★ ★ <span className="gray-star review-star">★ ★ ★</span></span>}
                                                    {userReviews.find(review => review.restaurant_id === reservation.restaurant_id).rating === 3 &&
                                                        <span className="red-star review-star">★ ★ ★ <span className="gray-star review-star">★ ★</span></span>}
                                                    {userReviews.find(review => review.restaurant_id === reservation.restaurant_id).rating === 4 &&
                                                        <span className="red-star review-star">★ ★ ★ ★ <span className="gray-star review-star">★</span></span>}
                                                    {userReviews.find(review => review.restaurant_id === reservation.restaurant_id).rating === 5 &&
                                                        <span className="red-star review-star">★ ★ ★ ★ ★ </span>}
                                                </div>
                                            </div>
                                            :
                                            <div className="dining-dashboard-past-leave-review-container">
                                                <span className="dining-dashboard-past-leave-review-text">
                                                    Leave a review
                                                    <span className="gray-star dining-dashboard-past-reservation-star">★ ★ ★ ★ ★</span>
                                                </span>
                                            </div>
                                        }
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
    )
}


export default DiningDashboardReservations;