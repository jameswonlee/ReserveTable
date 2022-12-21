import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DiningDashboardReservations from './DiningDashboardReservations';
import DiningDashboardSavedRestaurants from './DiningDashboardSavedRestaurants';
import newIcon from '../../icons/new-icon.ico';
import './DiningDashboard.css';


function DiningDashboard() {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [showReservations, setShowReservations] = useState(true);
    const [showSavedRestaurants, setShowSavedRestaurants] = useState(false);

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
                        <div onClick={() => {
                            setShowSavedRestaurants(false)
                            setShowReservations(true)
                        }}
                            className="dining-dashboard-space-to-top first-item dining-dashboard-reservations">
                            Reservations
                        </div>
                        <div onClick={() => {
                            setShowReservations(false)
                            setShowSavedRestaurants(true)
                        }}
                            className="dining-dashboard-space-to-top not-first-item dining-dashboard-saved-restaurants">
                            Saved Restaurants
                        </div>
                        <div className="dining-dashboard-space-to-top not-first-item">Account Details <img src={newIcon} className="dining-history-new-icon" /></div>
                        <div className="dining-dashboard-space-to-top not-first-item">Preferences</div>
                        <div className="dining-dashboard-space-to-top not-first-item">Payment Methods</div>
                    </div>
                </div>
                {showReservations &&
                    <DiningDashboardReservations />
                }
                {showSavedRestaurants &&
                    <DiningDashboardSavedRestaurants />
                }

            </div>
        </div>
    )
}


export default DiningDashboard;