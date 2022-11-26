import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getOneRestaurant } from '../../store/restaurants';
import Reviews from '../Reviews/Reviews'
import Reservations from '../Reservations/Reservations';
import AdditionalInfo from './AdditionalInfo';
import './RestaurantProfile.css'




function RestaurantProfile() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const restaurant = useSelector(state => state.restaurants[restaurantId]);

    useEffect(() => {
        dispatch(getOneRestaurant(restaurantId))
    }, [restaurantId])

    if (!restaurant) return null;

    const reviews = restaurant.reviews.map(({ review }) => {
        return review
    })

    // const reviewCount = restaurant.reviews.length

    // const averageRating = () => {
    //     let sum = 0;
    //     for (let i = 0; i < reviews.length; i++) {
    //         let review = reviews[i];
    //         sum += review.rating
    //     }
    //     return sum / reviewCount
    // }

    // const restaurantRating = averageRating().toFixed(1);




    return (
        <div className="restaurant-profile-main-container">

            <div className="restaurant-profile-upper">
                <div clasName="restaurant-profile-image-container">
                    <img src={restaurant.preview_img} className="restaurant-profile-image" />
                    <div className="overflow-into-image">
                        <div className="restaurant-profile-details-tabs">
                            <div>Overview</div>
                            <div>Experiences</div>
                            <div>Popular dishes</div>
                            <div>Photos</div>
                            <div>Menu</div>
                            <div>Reviews</div>
                        </div>
                        <div className="reservations-component">
                            <Reservations />
                            <h2>MAKE A RESERVATION</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="restaurant-profile-lower">
                <div className="restaurant-profile-details-container">

                    <div className="restaurant-profile-left">
                        <div className="restaurant-profile-name">
                            <h1>{restaurant.name}</h1>
                        </div>
                        <div>
                            <p>{restaurant.description}</p>
                        </div>
                        <div className="restaurant-profile-general-info">

                        </div>
                        <div className="restaurant-profile-description">

                        </div>
                        <div className="restaurant-reviews-container">
                            <h2>REVIEWS</h2>
                            <div>{reviews.map(review => (
                                <div key={review.id}>{review}</div>
                            ))}</div>
                            <Reviews />
                        </div>
                    </div>


                    <div className="restaurant-profile-right">
                        <h2>Restaurant Profile Right Side</h2>
                        <div className="additional-info-container">

                            <h1>Additional Info</h1>
                            <AdditionalInfo />
                            <div>{restaurant.neighborhood}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}



export default RestaurantProfile;