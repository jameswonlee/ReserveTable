import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import DiningDashboardReservations from './DiningDashboardReservations';
import DiningDashboardSavedRestaurants from './DiningDashboardSavedRestaurants';
import newIcon from '../../icons/new-icon.ico';
import './DiningDashboard.css';


function DiningDashboard() {
    const history = useHistory();
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const params = new URLSearchParams(location.search);

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
                            history.push(`/users/${sessionUser.id}/dining-dashboard`)
                        }}
                            className="dining-dashboard-space-to-top dining-dashboard-reservations">
                            {!params.has('view')
                                ?
                                <div className="dining-dashboard-reservations-text-true">Reservations</div>
                                :
                                <div className="dining-dashboard-reservations-text-false">Reservations</div>
                            }
                        </div>
                        <div onClick={() => {
                            history.push(`/users/${sessionUser.id}/dining-dashboard?view=saved-restaurants`)
                        }}
                            className="dining-dashboard-space-to-top dining-dashboard-saved-restaurants">
                            {params.get('view') === 'saved-restaurants'
                                ?
                                <div className="dining-dashboard-saved-restaurants-text-true">Saved Restaurants</div>
                                :
                                <div className="dining-dashboard-saved-restaurants-text-false">Saved Restaurants</div>
                            }
                        </div>
                        <div className="dining-dashboard-space-to-top not-first-item">Account Details <img src={newIcon} alt="" className="dining-history-new-icon" /></div>
                        <div className="dining-dashboard-space-to-top not-first-item">Preferences</div>
                        <div className="dining-dashboard-space-to-top not-first-item">Payment Methods</div>
                    </div>
                </div>
                {!params.has('view') &&
                    <DiningDashboardReservations />
                }
                {params.get('view') === 'saved-restaurants' &&
                    <DiningDashboardSavedRestaurants />
                }
            </div>
        </div>
    )
}


export default DiningDashboard;