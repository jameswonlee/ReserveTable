import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllRestaurants } from "../../store/restaurants";



function SearchResults() {
    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const date = params.get('date');
    const time = params.get('time');
    const partySize = params.get('partySize');
    const search = params.get('search');

    const allRestaurants = useSelector(state => Object.values(state.restaurants));
    console.log('allRestaurants', allRestaurants);

    const filteredRestaurants = allRestaurants
        .filter(restaurant => restaurant.name.toLowerCase().includes(search.toLowerCase()));
    const restaurants = [...new Set(filteredRestaurants)];


    const allLocations = () => {
        let uniqueLocations = [];

        allRestaurants.forEach(restaurant => {
            uniqueLocations.push(restaurant.neighborhood)
        })
        return [...new Set(uniqueLocations)];
    }

    const locationsArr = allLocations();
    const locations = locationsArr
        .filter(location => location.toLowerCase().includes(search.toLowerCase()));






    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [dispatch]);







    return (
        <div>
            SEARCH RESULTS
        </div>
    )
}




export default SearchResults;