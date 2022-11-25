import { useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";

import './ProfileButtonMenu.css'




function ProfileButtonMenu({ setShowSignInModal }) {
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {

    }, [sessionUser])

    if (!sessionUser) {
        return null;
    }

    return (
        <div className="profile-drop-down-menu overlay">
            <div className="profile-drop-down-top">
                <div className="greeting">Hello, {sessionUser.first_name}!</div>
            </div>
            <div className="profile-drop-down-bottom">
                <div><button className="profile-button gray">My Profile</button></div>
                <div><button className="profile-button gray">My Dining History</button></div>
                <div><button className="profile-button gray">My Saved Restaurants</button></div>
                <div><LogoutButton setShowSignInModal={setShowSignInModal} /></div>
            </div>
        </div>
    )
}



export default ProfileButtonMenu;