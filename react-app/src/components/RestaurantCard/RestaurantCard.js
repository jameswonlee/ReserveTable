import { NavLink } from 'react-router-dom';
import './RestaurantCard.css'


function RestaurantCard({ restaurant }) {

    return (
        <NavLink to={`/restaurants/${restaurant.id}`} className="restaurant-card-container">
            <div className="preview-image-container">
                <img className="preview-image" src={restaurant.preview_img} />
            </div>
            <div className="restaurant-preview-details">
                <p>{restaurant.restaurant_name}</p>
            </div>
        </NavLink>
    )
}



export default RestaurantCard;