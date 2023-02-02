import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../store/restaurants";
import { getAllSavedRestaurants } from "../../store/savedRestaurants";
import { deleteSavedRestaurant } from "../../store/savedRestaurants";
import savedRestaurantIcon from '../../icons/saved-restaurant-icon.ico';
import './DiningDashboardSavedRestaurants.css';


function DiningDashboardSavedRestaurants() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const allRestaurants = useSelector(state => Object.values(state.restaurants));
    const savedRestaurantsData = useSelector(state => Object.values(state.savedRestaurants));

    let savedRestaurants = []
    for (let i = 0; i < allRestaurants.length; i++) {
        let restaurant = allRestaurants[i];

        savedRestaurantsData.forEach(savedRestaurant => {
            if (restaurant.id === savedRestaurant.restaurant_id) {
                savedRestaurants.push(restaurant)
            }
        })
    }

    const averageRating = (reviews) => {
        let sum = 0;

        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            sum += review.rating;
        }
        return sum / reviews.length;
    }

    const removeSavedRestaurant = (restaurantId) => {
        dispatch(deleteSavedRestaurant(sessionUser.id, restaurantId));
    }

    const restaurantCuisine = (restaurant) => {
        return restaurant.cuisines.split(", ")[0]
    }

    const routeToReservations = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}`);
    }

    useEffect(() => {
        dispatch(getAllRestaurants())
        dispatch(getAllSavedRestaurants(sessionUser.id));
    }, [dispatch, sessionUser.id])



    return (
        <div className="saved-restaurants-outer-container">
            <div className="saved-restaurants-heading">
                <h2 className="saved-restaurants-header-text">Saved Restaurants</h2>
            </div>
            {savedRestaurantsData.length > 0
                ?
                <div className="saved-restaurants-show-container">
                    {savedRestaurants.map(restaurant => (
                        <div key={restaurant.id} className="saved-restaurants-restaurant-container">
                            <div className="saved-restaurants-restaurant-left">
                                <div className="saved-restaurants-restaurant-image-container"
                                    onClick={() => routeToReservations(restaurant.id)}>
                                    <img src={restaurant.preview_img} alt="" className="saved-restaurants-restaurant-image" />
                                </div>
                                <div className="saved-restaurants-restaurant-details-container">
                                    <div className="saved-restaurants-restaurant-name-text"
                                        onClick={() => routeToReservations(restaurant.id)}>
                                        {restaurant.name}
                                    </div>
                                    <div className="saved-restaurants-icon-and-remove" onClick={() => removeSavedRestaurant(restaurant.id)}>
                                        <img src={savedRestaurantIcon} alt="" className="saved-restaurants-saved-restaurant-icon" />
                                        <div className="saved-restaurants-remove-text">Remove from saved restaurants</div>
                                    </div>
                                    <div className="saved-restaurants-rating-stars-container">
                                        {restaurant.reviews
                                            ?
                                            <span>{averageRating(restaurant.reviews).toFixed(1) >= 0.1 &&
                                                averageRating(restaurant.reviews).toFixed(1) < 1.6 &&
                                                <span className="peach-star saved-restaurants-star">★<span className="gray-star saved-restaurants-star">★★★★</span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 1.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 2.6 &&
                                                    <span className="peach-star saved-restaurants-star">★★<span className="gray-star saved-restaurants-star">★★★</span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 2.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 3.6 &&
                                                    <span className="peach-star saved-restaurants-star">★★★<span className="gray-star saved-restaurants-star">★★</span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 3.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 4.6 &&
                                                    <span className="peach-star saved-restaurants-star">★★★★<span className="gray-star saved-restaurants-star">★</span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 4.6 &&
                                                    <span className="peach-star saved-restaurants-star">★★★★★</span>}
                                            </span>
                                            :
                                            <div className="saved-restaurants-no-rating"></div>
                                        }
                                    </div>
                                    <div className="saved-restaurants-restaurant-cuisine">
                                        {restaurantCuisine(restaurant)} | Los Angeles / {restaurant.neighborhood}
                                    </div>
                                </div>
                            </div>
                            <div className="saved-restaurants-restaurant-right">
                                <button onClick={() => routeToReservations(restaurant.id)} className="saved-restaurants-reserve-now-button">
                                    Reserve Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className="saved-restaurants-no-saved-restaurants-container">
                    <div className="saved-restaurants-no-favorites-text">
                    You have no favorite restaurants to show on this list.

                    </div>
                </div>
            }
        </div>
    )
}



export default DiningDashboardSavedRestaurants;