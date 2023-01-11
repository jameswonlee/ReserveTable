import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllRestaurants } from '../../store/restaurants'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import getCurrentLocation from '../../icons/current-location-arrow.ico'
import './AllRestaurants.css'


function DisplayAllRestaurants({ setUserReservationTime }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [dispatch])

    const allRestaurants = useSelector(state => Object.values(state.restaurants));

    return (
        <>
            <div className="all-restaurants-outer-container">
                <div className="all-restaurants-container">
                    <div className="above-restaurant-cards">
                        <div className="verify-city"><p>It looks like you're in West Hollywood. Not correct?</p></div>
                        <div><img src={getCurrentLocation} className="current-location-arrow" alt="" /></div>
                        <div className="get-current-location">Get current location</div>
                    </div>
                    <div className="card-wrapper">
                        <div className="restaurant-cards">
                            {allRestaurants.map(restaurant => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant} setUserReservationTime={setUserReservationTime} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default DisplayAllRestaurants;