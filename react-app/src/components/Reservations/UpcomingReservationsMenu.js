import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserReservations } from "../../store/reservations";




function UpcomingReservationsMenu() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userReservations = useSelector(state => state.reservations);

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id));
    }, [])



    return (
        <div className="upcoming-reservations-menu-container">
            <div>
                <div>
                    Upcoming Reservations
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}



export default UpcomingReservationsMenu;