import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bookingSymbol from '../../icons/booking-symbol.ico'
import './RestaurantCard.css'


function RestaurantCard({ restaurant }) {
    const reviews = restaurant.reviews

    let reviewCount;

    const averageRating = () => {
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            sum += review.rating
        }
        reviewCount = reviews.length
        return sum / reviewCount
    }


    return (
        <NavLink to={`/restaurants/${restaurant.id}`} className="restaurant-card-container">
            <div className="preview-image-container">
                <img className="preview-image" src={restaurant.preview_img} />
            </div>
            <div className="restaurant-name-and-details-container">
                <h2 className="restaurant-card-name dark-font">{restaurant.name}</h2>
                <div className="restaurant-preview-details">
                    <p className="preview-stars-reviews">
                        {restaurant.reviews &&
                            <span>{averageRating().toFixed(1)}</span>}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {restaurant.reviews &&
                            <span>{restaurant.reviews.length} reviews</span>}
                    </p>
                    <p className="preview-cuisine-cost-neighborhood">
                        <span>{restaurant.cuisines.split(',')[0]} </span>
                        &nbsp;&#x2022;&nbsp;
                        <span> $$$$$ </span>
                        &nbsp;&#x2022;&nbsp;
                        <span> {restaurant.neighborhood}</span>
                    </p>
                    <div className="booked-num">
                        <div className="booking-symbol-container">
                            <img src={bookingSymbol} className="booking-symbol" />
                        </div>
                        {restaurant.total_num_reservations !== 0 &&
                            (restaurant.total_num_reservations === 1
                                ?
                                <p>Booked {restaurant.total_num_reservations} time today</p>
                                :
                                <p>Booked {restaurant.total_num_reservations} times today</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </NavLink>
    )
}



export default RestaurantCard;