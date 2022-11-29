import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllUserReservations } from "../../store/reservations";
import upcomingRestaurantIcon from '../../icons/upcoming-reservation-logo.ico';
import './UpcomingReservationsMenu.css';



function UpcomingReservationsMenu() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const userReservationsObj = useSelector(state => state.reservations);
    const userReservations = Object.values(userReservationsObj);
    const nextReservation = userReservations[0];
  
    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id));
    }, [sessionUser])

    const handleSubmit = () => {
        history.push(`/reservations/${nextReservation.id}`)
    }

    return (
        <div className="upcoming-reservations-menu-container">
            <div>
                <div>
                    Upcoming Reservations
                </div>
                <div>
                    {nextReservation
                        ?
                        <div className="next-reservation-details-container">
                            <div>
                                <span>
                                    <img src={upcomingRestaurantIcon} className="upcoming-restaurant-icon" /><span>{nextReservation.restaurant.name}</span>
                                </span>
                            </div>
                            <div>Table for {nextReservation.party_size} people</div>
                            <div>{nextReservation.reservation_time.split(':00 GMT')}</div>
                            <div>
                                <span>
                                    <button onClick={handleSubmit}>View</button>
                                    <button onClick={handleSubmit}>Modify</button>
                                    <button>Invite guests</button>
                                </span>
                            </div>
                            <div>Cancel</div>
                        </div>
                        :
                        <div>NO UPCOMING RESERVATIONS</div>
                    }
                    <div>View all reservations</div>
                </div>
            </div>
        </div>
    )
}



export default UpcomingReservationsMenu;