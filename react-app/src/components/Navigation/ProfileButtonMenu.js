// import { useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../_auth/LogoutButton";

import './ProfileButtonMenu.css'


function ProfileButtonMenu({ setShowSignInModal }) {
    const sessionUser = useSelector(state => state.session.user)

    // useEffect(() => {

    // }, [sessionUser])

    // if (!sessionUser) {
    //     return null;
    // }

    return (
        <div className="profile-drop-down-menu overlay">
            <div className="profile-drop-down-top">
                <div className="greeting">Hello, {sessionUser.first_name}!</div>
                <div className="points-graph">0 PTS 2000 PTS</div>
                <div className="learn-about-points">Learn more about points</div>
            </div>
            <div className="profile-drop-down-bottom">
                <div className="profile-drop-button">My Profile</div>
                <div className="profile-drop-button">My Dining History</div>
                <div className="profile-drop-button">My Saved Restaurants</div>
                <div className="profile-log-out-button"><LogoutButton setShowSignInModal={setShowSignInModal} /></div>
            </div>
        </div>

    )
}



export default ProfileButtonMenu;