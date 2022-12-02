import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getAllUserReservations } from "../../store/reservations";
import CancelReservation from "./CancelReservation";
import lineBreak from '../../icons/button-line-break.ico';
import confirmCheck from '../../icons/reservation-confirmed-icon.ico';
import personIcon from '../../icons/person-icon.ico';
import upcomingReservationIcon from '../../icons/upcoming-reservations-icon.ico';
import locationIcon from '../../icons/location-icon.ico';
// import lineBreak from '../../icons/line-break.png';
import dayjs from 'dayjs';
import './ReservationConfirmation.css';



function ReservationConfirmation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reservationId } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const allReservations = useSelector(state => Object.values(state.reservations));
    const reservation = allReservations.filter(reservation => reservation.id === +reservationId)[0];

    const [showCancelModal, setShowCancelModal] = useState(false);

    const openCancelModal = () => {
        setShowCancelModal(true);
    }

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id))
    }, [])

    if (!reservation) return null;

    const routeToModifyPage = () => {
        history.push(`/reservations/${reservationId}/modify`)
    }

    if (!sessionUser) {
        history.replace('/');
        return null;
    };


    return (
        <div className="reservation-details-outer-container">
            <div className="reservation-confirmation-details-left">
                <div className="reservation-restaurant-image">
                    <img src={reservation.restaurant.preview_img} className="reservation-confirmation-preview-img" />
                </div>
                <div className="reservation-restaurant-name-options">
                    <div className="reservation-confirm-name-text">
                        {reservation.restaurant.name}
                    </div>
                    <div className="reservaton-confirm-check-container">
                        <span>
                            <img src={confirmCheck} className="reservation-confirm-check-mark" />
                            <span className="reservation-confirm-confirmed-text">Reservation confirmed</span>
                        </span>
                    </div>
                    <div className="reservation-confirm-party-size-time-container">
                        <img src={personIcon} className="reservation-confirm-person-icon" />
                        &nbsp;&nbsp;
                        <div className="reservation-confirm-party-size-text">{reservation.party_size} (Standard seating)</div>
                        &nbsp;&nbsp;
                        <img src={upcomingReservationIcon} className="reservation-confirm-upcoming-icon" />
                        <div>{dayjs(reservation?.reservation_time).format("ddd, MMM D [at] h:mm A")}</div>
                    </div>
                    <div className="modify-cancel-add-to-calendar-buttons reservation-confirm-space-to-left">
                        <span>
                            <button onClick={routeToModifyPage} className="reservation-confirm-buttons">Modify</button>
                            &nbsp;
                            <img src={lineBreak} className="edit-reservation-line-break" />
                            &nbsp;
                            <button onClick={openCancelModal} className="reservation-confirm-buttons">Cancel</button>
                            &nbsp;
                            <img src={lineBreak} className="edit-reservation-line-break" />
                            &nbsp;
                            <button className="reservation-confirm-buttons">Add to calendar</button>
                        </span>
                    </div>
                </div>
            </div>
            {showCancelModal &&
                <Modal onClose={() => setShowCancelModal(false)}>
                    <CancelReservation reservation={reservation} setShowCancelModal={setShowCancelModal} />
                </Modal>
            }

            <div className="reservation-confirmation-details-right">
                <div className="user-info-details-container">
                    <div className="reservation-confirmation-person-name">
                        <div>
                            <img src={personIcon} className="reservation-confirm-user-person-icon" />
                        </div>
                        <div className="reservation-confirm-person-name-text">
                            {sessionUser.first_name} {sessionUser.last_name}
                        </div>
                    </div>
                    <div className="reservation-confirm-joined-in-date">
                        Joined in December 2022
                    </div>
                    <div className="reservation-confirm-location-icon-city">
                        <img src={locationIcon} className="reservation-confirm-location-icon"/>
                        <div className="reservation-confirm-city-text">Los Angeles</div>
                    </div>
                    {/* <div>
                        [number of reviews goes here]
                    </div> */}
                </div>
            </div>
        </div>
    )
}


export default ReservationConfirmation;