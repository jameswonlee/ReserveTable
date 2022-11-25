import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllRestaurants } from '../../store/restaurants'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import getCurrentLocation from '../../images/get-current-location.png'
import './AllRestaurants.css'


function DisplayAllRestaurants() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [])

    const allRestaurants = useSelector(state => Object.values(state.restaurants));

    return (
        <div className="all-restaurants-container">
            <div className="above-restaurant-cards">
                <div className="verify-city">It looks like you're in West Hollywood. Not correct? </div>
                <div><img src={getCurrentLocation} className="get-current-location" /></div>
            </div>
            <div className="card-wrapper">
                <div className="restaurant-cards">
                    {allRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </div>
    )
}


export default DisplayAllRestaurants;