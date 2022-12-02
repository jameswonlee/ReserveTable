import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllUserReservations } from "../../store/reservations";
import upcomingRestaurantIcon from '../../icons/upcoming-reservation-logo.ico';
import personIcon from '../../icons/person-icon.ico';
import clockIcon from '../../icons/clock-icon.ico';
import upcomingReservationIcon from '../../icons/upcoming-reservations-icon.ico';
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

    // if (!userReservations.length > 0) return null;

    return (
        <div className="upcoming-reservations-menu-container">
            {nextReservation
                ?
                <div className="next-reservation-details-container">
                    <div className="upcoming-reservations-menu-heading">
                        Upcoming reservations
                    </div>
                    <div className="upcoming-reservation-menu-icon-name">
                        <div>
                            <img src={upcomingRestaurantIcon} className="upcoming-restaurant-icon" />
                        </div>
                        <div className="upcoming-reservation-menu-name">
                            {nextReservation.restaurant?.name}
                        </div>
                    </div>
                    <div className="upcoming-reservation-menu-date-details">
                        <div className="upcoming-reservation-menu-party-size">
                            <div>
                                <img src={personIcon} className="upcoming-reservation-menu-person-icon" />
                            </div>
                            <div className="upcoming-reservation-space-to-right">
                                Table for {nextReservation.party_size} people
                            </div>
                        </div>
                        <div>
                            <div className="upcoming-reservation-menu-time">
                                <div>
                                    <img src={clockIcon} className="upcoming-reservations-clock-icon" />
                                </div>
                                <div className="upcoming-reservation-space-to-right">
                                    {dayjs(nextReservation.reservation_time).format("h:mm A")}
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className="upcoming-reservation-menu-time">
                                <div>
                                    <img src={upcomingReservationIcon} className="upcoming-reservation-menu-icon" />
                                </div>
                                <div>
                                    <div className="upcoming-reservation-menu-time-details">
                                        {dayjs(nextReservation.reservation_time).format("MMM D, YYYY")}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>
                            <button onClick={handleSubmit}>View</button>
                            <button onClick={handleSubmit}>Modify</button>
                            <button>Invite guests</button>
                        </span>
                    </div>
                    <div>Cancel</div>
                    <div onClick={clickHandler} className="upcoming-view-all-reservations">View all reservations</div>
                </div>
                :
                <div>You have no upcoming reservations</div>
            }

        </div>
    )
}



export default UpcomingReservationsMenu;