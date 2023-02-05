import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutButton from "../_auth/LogoutButton";
import pointsGraph from '../../icons/points-graph.ico'
import './ProfileButtonMenu.css'


function ProfileButtonMenu({ setShowSignInModal }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const routeToDiningDashboard = () => {
        history.push(`/users/${sessionUser.id}/dining-dashboard`);
    }

    const routeToSavedRestaurants = () => {
        history.push(`/users/${sessionUser.id}/dining-dashboard?view=saved-restaurants`);
    }


    return (
        <div className="profile-drop-down-menu">
            <div className="profile-drop-down-top">
                <div className="greeting">Hello, {sessionUser.first_name}!</div>
                <div className="profile-drop-down-points">
                    <div className="points-earned">
                        <div className="points-earned-left">
                            <div className="earned-text">
                                Earned
                            </div>
                            <div className="points-text-left">
                                <span>0 <span className="points-text-color-gray">PTS</span></span>
                            </div>
                        </div>
                        <div className="points-earned-right">
                            <div className="next-reward-text">
                                Next reward
                            </div>
                            <div className="points-text-right">
                                <span>2000 <span className="points-text-color-gray">PTS</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="points-graph">
                    <img src={pointsGraph} className="points-graph-icon" alt="" />
                </div>
                <div className="learn-about-points">Learn more about points</div>
            </div>
            <div className="profile-drop-down-bottom">
                <div className="profile-drop-button profile-drop-my-profile">
                    <span className="spacing-down profiile-drop-button-left">My Profile</span>
                </div>
                <div className="profile-drop-button my-dining-history" onClick={routeToDiningDashboard}>
                    <span className="spacing-down profiile-drop-button-left">My Dining History</span>
                </div>
                <div className="profile-drop-button my-saved-restaurants" onClick={routeToSavedRestaurants}>
                    <span className="spacing-down profiile-drop-button-left">My Saved Restaurants</span>
                </div>
                <div className="profile-log-out-button"><LogoutButton setShowSignInModal={setShowSignInModal} /></div>
            </div>
        </div>
    )
}



export default ProfileButtonMenu;