import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllRestaurants } from '../../store/restaurants'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import './AllRestaurants.css'


function DisplayAllRestaurants() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [])

    const allRestaurants = useSelector(state => Object.values(state.restaurants));

    return (
        <div className="card-wrapper">
            <div className="restaurant-cards">
                {allRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    )
}


export default DisplayAllRestaurants;