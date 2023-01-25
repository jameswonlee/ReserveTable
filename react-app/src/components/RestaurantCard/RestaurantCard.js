import { NavLink, useHistory } from 'react-router-dom';
import bookingSymbol from '../../icons/booking-symbol.ico'
import './RestaurantCard.css'


function RestaurantCard({ restaurant, setUserReservationTime }) {
    const history = useHistory();
    const reviews = restaurant.reviews

    const averageRating = () => {
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            sum += review.rating;
        }
        return sum / reviews.length;
    }

    const routeToReservations = (e, { userReservationTime }) => {
        e.preventDefault();
        setUserReservationTime(userReservationTime);
        history.push(`/restaurants/${restaurant.id}/?view=reservations`);
    }

    return (
        <NavLink to={`/restaurants/${restaurant.id}`} className="restaurant-nav-card-container">
            <div className="restaurant-card-upper">
                <div className="preview-image-container">
                    <img className="preview-image" src={restaurant.preview_img}
                        alt="img2"
                        onError={(e) => {
                            e.target.src = "https://cdn.vox-cdn.com/thumbor/OheW0CNYdNihux9eVpJ958_bVCE=/0x0:5996x4003/1200x900/filters:focal(1003x1633:1961x2591)/cdn.vox-cdn.com/uploads/chorus_image/image/51830567/2021_03_23_Merois_008.30.jpg";
                        }}
                    />
                </div>
            </div>
            <div className="restaurant-card-lower">
                <div className="restaurant-name-and-details-container">
                    <div className="restaurant-card-name dark-font">{restaurant.name}</div>
                    <div className="preview-stars-reviews">
                        {restaurant.reviews
                            ?
                            <span>{averageRating().toFixed(1) >= 0.1 &&
                                averageRating().toFixed(1) < 1.6 &&
                                <span className="red-star card-star">★<span className="gray-star card-star"> ★ ★ ★ ★</span></span>}
                                {averageRating().toFixed(1) >= 1.6 &&
                                    averageRating().toFixed(1) < 2.6 &&
                                    <span className="red-star card-star">★ ★ <span className="gray-star card-star">★ ★ ★</span></span>}
                                {averageRating().toFixed(1) >= 2.6 &&
                                    averageRating().toFixed(1) < 3.6 &&
                                    <span className="red-star card-star">★ ★ ★ <span className="gray-star card-star">★ ★</span></span>}
                                {averageRating().toFixed(1) >= 3.6 &&
                                    averageRating().toFixed(1) < 4.6 &&
                                    <span className="red-star card-star">★ ★ ★ ★ <span className="gray-star card-star">★</span></span>}
                                {averageRating().toFixed(1) >= 4.6 &&
                                    <span className="red-star card-star">★ ★ ★ ★ ★</span>}
                            </span>
                            :
                            <span className="gray-star card-star">★ ★ ★ ★ ★<span className="preview-num-reviews">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 Reviews</span>
                            </span>
                        }
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {restaurant.reviews &&
                            restaurant.reviews.length === 1 &&
                            <span className="preview-num-reviews">{restaurant.reviews.length} review</span>
                        }
                        {restaurant.reviews &&
                            restaurant.reviews.length !== 1 &&
                            <span className="preview-num-reviews">{restaurant.reviews.length} reviews</span>
                        }
                    </div>
                    <div className="preview-cuisine-cost-neighborhood">
                        <span className="">{restaurant.cuisines.split(',')[0]} </span>
                        &nbsp;&#x2022;&nbsp;
                        {restaurant.cost === 1 && <span className="dark-gray-dollar">$<span className="light-gray-dollar">$$$</span></span>}
                        {restaurant.cost === 2 && <span className="dark-gray-dollar">$$<span className="light-gray-dollar">$$</span></span>}
                        {restaurant.cost === 3 && <span className="dark-gray-dollar">$$$<span className="light-gray-dollar">$</span></span>}
                        {restaurant.cost === 4 && <span className="dark-gray-dollar">$$$$</span>}

                        &nbsp;&#x2022;&nbsp;
                        <span> {restaurant.neighborhood}</span>
                    </div>
                    <div className="booked-num">
                        <div className="booking-symbol-container">
                            {restaurant.total_num_reservations > 0 &&
                                <img src={bookingSymbol} alt="" className="booking-symbol" />
                            }
                        </div>
                        <div>
                            {!restaurant.total_num_reservations &&
                                <div className="restaurant-card-total-bookings-zero"></div>
                            }
                            {restaurant.total_num_reservations > 0 &&
                                (restaurant.total_num_reservations === 1
                                    ?
                                    <p>Booked {restaurant.total_num_reservations} time today</p>
                                    :
                                    <p>Booked {restaurant.total_num_reservations} times today</p>
                                )}
                        </div>
                    </div>
                    <div className="preview-time-buttons-continer">
                        <div className="preview-time-buttons-div">
                            <div>
                                <button className="preview-time-buttons 6pm" onClick={(e) => routeToReservations(e, { userReservationTime: "18:00" })}>
                                    6:00 PM
                                </button>
                            </div>
                            <div>
                                <button className="preview-time-buttons 630pm" onClick={(e) => routeToReservations(e, { userReservationTime: "18:30" })}>
                                    6:30 PM
                                </button>
                            </div>
                            <div>
                                <button className="preview-time-buttons 7pm" onClick={(e) => routeToReservations(e, { userReservationTime: "19:00" })}>
                                    7:00 PM
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}



export default RestaurantCard;