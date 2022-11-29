// import { useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../_auth/LogoutButton";
import pointsGraph from '../../icons/points-graph.ico'

import './ProfileButtonMenu.css'


function ProfileButtonMenu({ setShowSignInModal }) {
    const sessionUser = useSelector(state => state.session.user)

    // useEffect(() => {

    // }, [sessionUser])

    // if (!sessionUser) {
    //     return null;
    // }

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
                    <img src={pointsGraph} className="points-graph-icon"/>
                </div>
                <div className="learn-about-points">Learn more about points</div>
            </div>
            <div className="profile-drop-down-bottom">
                <div className="profile-drop-button">
                    <span className="spacing-down">My Profile</span>
                </div>
                <div className="profile-drop-button">
                    <span className="spacing-down">My Dining History</span>
                </div>
                <div className="profile-drop-button">
                    <span className="spacing-down">My Saved Restaurants</span>
                </div>
                <div className="profile-log-out-button"><LogoutButton setShowSignInModal={setShowSignInModal} /></div>
            </div>
        </div>

    )
}



export default ProfileButtonMenu;