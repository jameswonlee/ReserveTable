import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


function DisplayAllRestaurants() {
    const dispatch = useDispatch();

    const allRestaurants = useSelector(state => state);
    console.log('allRestaurants', allRestaurants)

    return (
        <div></div>
    )
}


export default DisplayAllRestaurants;