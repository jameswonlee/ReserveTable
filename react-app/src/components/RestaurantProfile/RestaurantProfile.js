import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getOneRestaurant } from '../../store/restaurants';
import Reviews from '../Reviews/Reviews'
import Reservations from '../Reservations/Reservations';
import AdditionalInfo from './AdditionalInfo';
import reviewsIcon from './icons/reviews-icon.ico';
import costIcon from './icons/cost-icon.ico';
import cuisineIcon from './icons/cuisine-icon.ico';
import './RestaurantProfile.css'




function RestaurantProfile({ userReservationTime }) {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const restaurant = useSelector(state => state.restaurants[restaurantId]);

    useEffect(() => {
        dispatch(getOneRestaurant(restaurantId))
    }, [restaurantId])

    if (!restaurant) return null;

    const reviews = restaurant.reviews

    const averageRating = () => {
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            sum += review.rating
        }
        return sum / reviews.length;
    }



    return (
        <div className="restaurant-profile-main-container">
            <div className="restaurant-profile-upper">
                <div className="restaurant-profile-image-container">
                    <img src={restaurant.preview_img} className="restaurant-profile-image"
                        alt="img2"
                        onError={(e) => {
                            e.target.src = "https://cdn.vox-cdn.com/thumbor/OheW0CNYdNihux9eVpJ958_bVCE=/0x0:5996x4003/1200x900/filters:focal(1003x1633:1961x2591)/cdn.vox-cdn.com/uploads/chorus_image/image/51830567/2021_03_23_Merois_008.30.jpg";
                        }} />
                    <div className="overflow-into-image">
                        <div className="restaurant-profile-details-tabs">
                            <div className="space-to-left-11">Overview</div>
                            <div className="space-to-left-12">Experiences</div>
                            <div className="space-to-left-12">Popular dishes</div>
                            <div className="space-to-left-12">Photos</div>
                            <div className="space-to-left-12">Menu</div>
                            <div className="space-to-left-12">Reviews</div>
                        </div>
                        <div className="reservations-component">
                            <Reservations userReservationTime={userReservationTime}/>
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
                        </div>
                        <div className="restaurant-profile-general-info">
                            <div className="restaurant-profile-general-info-top">
                                <div className="space-to-left-21">
                                    {restaurant.reviews
                                        ?
                                        <span>{averageRating().toFixed(1) >= 0.1 &&
                                            averageRating().toFixed(1) < 1.9 &&
                                            <span className="red-star card-star">★ <span className="gray-star card-star">★ ★ ★ ★</span></span>}
                                            {averageRating().toFixed(1) >= 1.9 &&
                                                averageRating().toFixed(1) < 2.9 &&
                                                <span className="red-star card-star">★ ★ <span className="gray-star card-star">★ ★ ★</span></span>}
                                            {averageRating().toFixed(1) >= 2.9 &&
                                                averageRating().toFixed(1) < 3.9 &&
                                                <span className="red-star card-star">★ ★ ★ <span className="gray-star card-star">★ ★</span></span>}
                                            {averageRating().toFixed(1) >= 3.9 &&
                                                averageRating().toFixed(1) < 4.9 &&
                                                <span className="red-star card-star">★ ★ ★ ★ <span className="gray-star card-star">★</span></span>}
                                            {averageRating().toFixed(1) >= 4.9 &&
                                                <span className="red-star card-star">★ ★ ★ ★ ★ </span>}
                                            <span className="space-to-left-25">{averageRating().toFixed(1)}</span>
                                        </span>
                                        :
                                        <span className="gray-star card-star">★ ★ ★ ★ ★<span className="preview-num-reviews">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 Reviews</span>
                                        </span>
                                    }
                                </div>
                                <div className="space-to-left-22 review-icon-container">
                                    <div className="reviews-icon-div">
                                        <img src={reviewsIcon} className="profile-reviews-icon" />
                                    </div>
                                    <div>
                                        {reviews &&
                                            <div> {reviews.length} reviews</div>}
                                    </div>
                                </div>
                                <div className="space-to-left-22 cost-icon-container">
                                    <div className="cost-icon-div">
                                        <img src={costIcon} className="profile-cost-icon" />
                                    </div>
                                    <div>
                                        {restaurant.cost === 1 && "$30 and under"}
                                        {restaurant.cost === 2 && "$30 and under"}
                                        {restaurant.cost === 3 && "$31 to $50"}
                                        {restaurant.cost === 4 && "$50 and over"}
                                    </div>

                                </div>
                                <div className="space-to-left-22 cuisine-icon-container">
                                    <div className="cuisine-icon-div">
                                        <img src={cuisineIcon} className="profile-cuisine-icon" />
                                    </div>
                                    <div>
                                        {restaurant.cuisines.split(',')[0]}
                                    </div>
                                </div>
                            </div>
                            <div className="restaurant-profile-general-info-bottom">
                                <div className="space-to-left-23 top-tags1">
                                    Top Tags:
                                </div>
                                <div className="space-to-left-24 top-tags2">
                                    Hot Spot
                                </div>
                                <div className="space-to-left-24 top-tags3">
                                    Special Occasion
                                </div>
                                <div className="space-to-left-24 top-tags4">
                                    Fit For Foodies
                                </div>
                            </div>
                        </div>
                        <div className="restaurant-profile-description">
                            <p>{restaurant.description}</p>
                        </div>
                        <div className="restaurant-reviews-container">
                            <h2>What {reviews.length} people are saying</h2>
                            <Reviews restaurant={restaurant} />
                        </div>
                    </div>
                    <div className="restaurant-profile-right">
                        <div className="additional-info-container">
                            <AdditionalInfo restaurant={restaurant} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default RestaurantProfile;