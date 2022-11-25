import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bookingSymbol from '../../images/booking-symbol.png'
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
            <div className="restaurant-preview-details-container">
                <h3 className="restaurant-card-name dark-font">{restaurant.name}</h3>
                <div className="restaurant-preview-details">
                    {
                        restaurant.reviews &&
                        <p>{averageRating().toFixed(1)}</p>
                    }
                    {
                        restaurant.reviews &&
                        <p>{restaurant.reviews.length} reviews</p>
                    }
                    <p>{restaurant.cuisines.split(',')[0]}</p>
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