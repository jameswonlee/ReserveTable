import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bookingSymbol from '../../icons/booking-symbol.ico'
import './RestaurantCard.css'


function RestaurantCard({ restaurant }) {
    const reviews = restaurant.reviews

    const averageRating = () => {
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            sum += review.rating
        }
        return sum / reviews.length
    }

    // const star = <i class="fa-sharp fa-solid fa-star"></i>
 
    return (
        <NavLink to={`/restaurants/${restaurant.id}`} className="restaurant-card-container">
            <div className="restaurant-card-upper">
                <div className="preview-image-container">
                    <img className="preview-image" src={restaurant.preview_img} />
                </div>
            </div>
            <div className="restaurant-card-lower">
                <div className="restaurant-name-and-details-container">
                    <div className="restaurant-card-name dark-font">{restaurant.name}</div>
                    <div className="preview-stars-reviews">
                        {restaurant.reviews
                            ?
                            <span>{averageRating().toFixed(1) >= 0.1 &&
                                averageRating().toFixed(1) < 1.5 &&
                                <span className="red-star">★<span className="gray-star">★★★★</span></span>}
                                {averageRating().toFixed(1) >= 1.5 &&
                                    averageRating().toFixed(1) < 2.5 &&
                                    <span className="red-star">★★<span className="gray-star">★★★</span></span>}
                                {averageRating().toFixed(1) >= 2.5 &&
                                    averageRating().toFixed(1) < 3.5 &&
                                    <span className="red-star">★★★<span className="gray-star">★★</span></span>}
                                {averageRating().toFixed(1) >= 3.5 &&
                                    averageRating().toFixed(1) < 4.5 &&
                                    <span className="red-star">★★★★<span className="gray-star">★</span></span>}
                                {averageRating().toFixed(1) >= 4.5 &&
                                    <span className="red-star">★★★★★</span>}
                            </span>
                            :
                            <span className="gray-star">★★★★<span className="preview-num-reviews">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 Reviews</span>
                            </span>
                        }
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {restaurant.reviews &&
                            <span className="preview-num-reviews">{restaurant.reviews.length} reviews</span>}
                    </div>
                    <div className="preview-cuisine-cost-neighborhood">
                        <span>{restaurant.cuisines.split(',')[0]} </span>
                        &nbsp;&#x2022;&nbsp;
                        {restaurant.cost == 1 && <span className="dark-gray-dollar">$<span className="light-gray-dollar">$$$$</span></span>}
                        {restaurant.cost == 2 && <span className="dark-gray-dollar">$$<span className="light-gray-dollar">$$$</span></span>}
                        {restaurant.cost == 3 && <span className="dark-gray-dollar">$$$<span className="light-gray-dollar">$$</span></span>}
                        {restaurant.cost == 4 && <span className="dark-gray-dollar">$$$$<span className="light-gray-dollar">$</span></span>}
                        {restaurant.cost == 5 && <span className="dark-gray-dollar">$$$$$</span>}
                        
                        
                        
                       
                        &nbsp;&#x2022;&nbsp;
                        <span> {restaurant.neighborhood}</span>
                    </div>
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
                            )}
                    </div>
                </div>
            </div>
        </NavLink>
    )
}



export default RestaurantCard;