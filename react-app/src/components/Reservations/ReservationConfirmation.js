import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getAllUserReservations } from "../../store/reservations";
import { getUserReviews } from '../../store/reviews';
import CancelReservation from "./CancelReservation";
import lineBreak from '../../icons/button-line-break.ico';
import confirmCheck from '../../icons/reservation-confirmed-icon.ico';
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationIcon from '../../icons/upcoming-reservations-icon.ico';
import locationIcon from '../../icons/location-icon.ico';
import numReviewsIcon from '../../icons/num-reviews.ico';
import reservationCompletedIcon from '../../icons/reservation-completed-red-icon.ico';
import rateReviewIcon from '../../icons/rate-review-icon.ico';
import browseMenuIcon from '../../icons/browse-menu-icon.ico';
import getDirectionsIcon from '../../icons/get-directions-icon.ico';
import dayjs from 'dayjs';
import './ReservationConfirmation.css';


function ReservationConfirmation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reservationId } = useParams();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const sessionUser = useSelector(state => state.session.user);
    const allReservations = useSelector(state => Object.values(state.reservations));
    const reservation = allReservations.filter(reservation => reservation.id === +reservationId)[0];
    const userReviews = useSelector(state => state.reviews);
    const numReviews = Object.values(userReviews).length;

    const [showCancelModal, setShowCancelModal] = useState(false);


    useEffect(() => {
        if (params.get('showCancelModal') === 'true') {
            setShowCancelModal(true)
        } else {
            setShowCancelModal(false)
        }
    }, [params])

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser?.id))
        dispatch(getUserReviews(sessionUser?.id))
    }, [dispatch, sessionUser?.id])

    if (!reservation) return null;

    const routeToModifyPage = () => {
        history.push(`/reservations/${reservationId}/modify`);
    }

    const routeToRestaurant = () => {
        history.push(`/restaurants/${reservation.restaurant.id}`);
    }

    const routeToRateReview = () => {
        history.push(`/restaurants/${reservation.restaurant.id}?review=true`);
    }

    const routeToReservationConfirmation = () => {
        history.replace(`/reservations/${reservationId}`);
    }

    const routeToCancelReservationModal = () => {
        history.push(`/reservations/${reservation.id}?showCancelModal=true`);
    }

    if (!sessionUser) {
        history.replace('/');
        return null;
    };

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });


    return (
        <div className="reservation-details-outer-container">
            {dayjs(reservation.reservation_time) > dayjs()
                ?
                <div className="reservation-confirmation-details-left">
                    <div className="reservation-confirmation-details-left-upper">
                        <div className="reservation-restaurant-image">
                            <img src={reservation.restaurant.preview_img} alt="" className="reservation-confirmation-preview-img" />
                        </div>
                        <div className="reservation-restaurant-name-options">
                            <div onClick={routeToRestaurant} className="reservation-confirm-name-text">
                                {reservation.restaurant.name}
                            </div>
                            <div className="reservaton-confirm-check-container">
                                <span>
                                    <img src={confirmCheck} alt="" className="reservation-confirm-check-mark" />
                                    <span className="reservation-confirm-confirmed-text">Reservation confirmed</span>
                                </span>
                            </div>
                            <div className="reservation-confirm-party-size-time-container">
                                <img src={personIcon} alt="" className="reservation-confirm-person-icon" />
                                &nbsp;&nbsp;
                                <div className="reservation-confirm-party-size-text">{reservation.party_size} (Standard seating)</div>
                                &nbsp;&nbsp;
                                <img src={upcomingReservationIcon} alt="" className="reservation-confirm-upcoming-icon" />
                                <div className="reservation-confirmation-reservation-date-time">{dayjs(reservation?.reservation_time).format("ddd, MMM D [at] h:mm A")}</div>
                            </div>
                            <div className="modify-cancel-add-to-calendar-buttons reservation-confirm-space-to-left">
                                <span>
                                    <button onClick={routeToModifyPage} className="reservation-confirm-buttons">Modify</button>
                                    <img src={lineBreak} alt="" className="edit-reservation-line-break" />
                                    <button onClick={routeToCancelReservationModal} className="reservation-confirm-buttons">Cancel</button>
                                    <img src={lineBreak} alt="" className="edit-reservation-line-break" />
                                    <button className="reservation-confirm-buttons add-to-calendar">Add to calendar</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="reservation-confirmation-rate-menu-container-future">
                        <div onClick={routeToRestaurant} className="reservation-confirmation-browse-menu-container">
                            <div className="reservation-confirmation-browse-menu-left">
                                <img src={browseMenuIcon} alt="" className="reservation-confirmation-browse-menu-icon" />
                            </div>
                            <div className="reservation-confirmation-browse-menu-right">
                                <div className="reservation-confirmation-browse-menu-text">Browse menu</div>
                                <div className="reservation-confirmation-restaurant-profile-text">Restaurant's profile</div>
                            </div>
                        </div>
                        <div className="reservation-confirmation-get-directions-container">
                            <div className="reservation-confirmation-get-directions-left">
                                <img src={getDirectionsIcon} alt="" className="reservation-confirmation-get-directions-icon" />
                            </div>
                            <div className="reservation-confirmation-get-directions-right">
                                <div className="reservation-confirmation-get-directions-text">Get directions</div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="reservation-confirmation-details-left">
                    <div className="reservation-confirmation-details-left-upper">
                        <div className="reservation-restaurant-image">
                            <img src={reservation.restaurant.preview_img} alt="" className="reservation-confirmation-preview-img" />
                        </div>
                        <div className="reservation-restaurant-name-options">
                            <div className="reservation-restaurant-name-book-again-container">
                                <div onClick={routeToRestaurant}className="reservation-confirm-past-name-text">
                                    {reservation.restaurant.name}
                                </div>
                                <div className="reservation-confirm-past-book-again-button-container">
                                    <button className="reservation-confirm-past-book-again-button" onClick={routeToRestaurant}>Book again</button>
                                </div>
                            </div>
                            <div className="reservaton-confirm-check-container">
                                <span>
                                    <img src={reservationCompletedIcon} alt="" className="reservation-confirm-check-mark" />
                                    <span className="reservation-confirm-confirmed-text">Reservation completed</span>
                                </span>
                            </div>
                            <div className="reservation-confirm-past-party-size-time-container">
                                <img src={personIcon} alt="" className="reservation-confirm-person-icon" />
                                &nbsp;&nbsp;
                                <div className="reservation-confirm-party-size-text">{reservation.party_size} (Standard seating)</div>
                                &nbsp;&nbsp;
                                <img src={upcomingReservationIcon} alt="" className="reservation-confirm-upcoming-icon" />
                                <div className="reservation-confirmation-reservation-date-time">{dayjs(reservation?.reservation_time).format("ddd, MMM D [at] h:mm A")}</div>
                            </div>
                        </div>
                    </div>
                    <div className="reservation-confirmation-rate-menu-container-past">
                        <div onClick={routeToRateReview}className="reservation-confirmation-rate-review-container">
                            <div className="reservation-confirmation-rate-review-left">
                                <img src={rateReviewIcon} alt="" className="reservation-confirmation-rate-review-icon" />
                            </div>
                            <div className="reservation-confirmation-rate-review-right">
                                <div className="reservation-confirmation-rate-review-text">Rate and review</div>
                                <div className="reservation-confirmation-rate-review-share-text">Share your experience</div>
                            </div>
                        </div>
                        <div onClick={routeToRestaurant} className="reservation-confirmation-browse-menu-container">
                            <div className="reservation-confirmation-browse-menu-left">
                                <img src={browseMenuIcon} alt="" className="reservation-confirmation-browse-menu-icon" />
                            </div>
                            <div className="reservation-confirmation-browse-menu-right">
                                <div className="reservation-confirmation-browse-menu-text">Browse menu</div>
                                <div className="reservation-confirmation-restaurant-profile-text">Restaurant's profile</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {showCancelModal &&
                <Modal onClose={routeToReservationConfirmation}>
                    <CancelReservation reservation={reservation} />
                </Modal>
            }
            <div className="reservation-confirmation-details-right">
                <div className="user-info-details-container">
                    <div className="reservation-confirmation-person-name">
                        <div>
                            <img src={personIcon} alt="" className="reservation-confirm-user-person-icon" />
                        </div>
                        <div className="reservation-confirm-person-name-text">
                            {sessionUser.first_name} {sessionUser.last_name}
                        </div>
                    </div>
                    <div className="reservation-confirm-joined-in-date">
                        Joined in December 2022
                    </div>
                    <div className="reservation-confirm-location-icon-city">
                        <img src={locationIcon} alt="" className="reservation-confirm-location-icon" />
                        <div className="reservation-confirm-city-text">Los Angeles</div>
                    </div>
                    {numReviews > 0 &&
                        <div className="reservation-confirm-num-reviews-container">
                            <img src={numReviewsIcon} alt="" className="reservation-confirm-num-reviews-icon" />
                            {numReviews === 1
                                ?
                                <div className="reservation-confirm-num-reviews-text">{numReviews} review</div>
                                :
                                <div className="reservation-confirm-num-reviews-text">{numReviews} reviews</div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default ReservationConfirmation;