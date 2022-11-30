import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllUserReservations } from "../../store/reservations";
import upcomingRestaurantIcon from '../../icons/upcoming-reservation-logo.ico';
import dayjs from 'dayjs';
import './UpcomingReservationsMenu.css';



function UpcomingReservationsMenu() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const userReservationsObj = useSelector(state => state.reservations);
    const userReservations = Object.values(userReservationsObj);
    userReservations.sort((reservationA, reservationB) => {
        return dayjs(reservationA.reservation_time).valueOf() - dayjs(reservationB.reservation_time).valueOf()
    })

    const nextReservation = userReservations[0];

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id));
    }, [sessionUser])

    const handleSubmit = () => {
        history.push(`/reservations/${nextReservation.id}`)
    };
    const clickHandler = () => {
        history.push(`/users/${sessionUser.id}/dining-dashboard`);
    }

    return (
        <div className="upcoming-reservations-menu-container">
                {nextReservation
                    ?
                    <div className="next-reservation-details-container">
                        <div>
                            Upcoming Reservations
                        </div>
                        <div>
                            <span>
                                <img src={upcomingRestaurantIcon} className="upcoming-restaurant-icon" /><span>{nextReservation.restaurant.name}</span>
                            </span>
                        </div>
                        <div>Table for {nextReservation.party_size} people</div>
                        <div>{dayjs(nextReservation.reservation_time).format("ddd, MMMM DD h:m a")}</div>
                        <div>
                            <span>
                                <button onClick={handleSubmit}>View</button>
                                <button onClick={handleSubmit}>Modify</button>
                                <button>Invite guests</button>
                            </span>
                        </div>
                        <div>Cancel</div>
                        <div onClick={clickHandler}>View all reservations</div>
                    </div>
                    :
                    <div>You have no upcoming reservations</div>
                }

            </div>
    )
}



export default UpcomingReservationsMenu;