import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getAllUserReservations } from "../../store/reservations";
import CancelReservation from "./CancelReservation";
import lineBreak from '../../icons/button-line-break.ico';
import dayjs from 'dayjs';
import './ReservationConfirmation.css';



function ReservationConfirmation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reservationId } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const allReservations = useSelector(state => Object.values(state.reservations));
    const reservation = allReservations.filter(reservation => reservation.id === +reservationId)[0];

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
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
                            <img className="standard-seating-icon"/>
                            <div>{reservation.party_size} (Standard seating)</div>
                            <img className="reservation-details-date-time"/>
                            <div>{dayjs(reservation?.reservation_time).format("ddd, MMM D [at] h:mm A")}</div>
                        </span>
                    </div>
                    <div className="modify-cancel-add-to-calendar-buttons">
                        <span>
                            <button onClick={routeToModifyPage}>Modify</button>
                            <img src={lineBreak} className="edit-reservation-line-break"/>
                            <button onClick={openModal}>Cancel</button>
                            <img src={lineBreak} className="edit-reservation-line-break"/>
                            {/* <button>Add to calendar</button> */}
                        </span>
                    </div>
                </div>
            </div>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <CancelReservation reservation={reservation} setShowModal={setShowModal}/>
                </Modal>
            }

            <div className="reservation-confirmation-details-right">
                <div className="user-info-details-container">
                    <div>{sessionUser.first_name} {sessionUser.last_name}</div>
                </div>
            </div>
        </div>
    )
}


export default ReservationConfirmation;