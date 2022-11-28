import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";







function ReservationConfirmation() {
    const { reservationId } = useParams();
    const sessionUser = useSelector(state => state.session.user);






    return (
        <div className="reservation-details-outer-container">
            <div className="reservation-detail-options">

            </div>
            <div className="user-info-details-container">
                <div>{sessionUser.first_name} {sessionUser.last_name}</div>

            </div>
        </div>
    )
}


export default ReservationConfirmation;