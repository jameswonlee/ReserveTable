import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAllRestaurants } from "../../store/restaurants";
import reservationDateIcon from '../../icons/upcoming-reservations-icon.ico';
import clockIcon from '../../icons/clock-icon.ico';
import personIcon from '../../icons/person-icon.ico';
import magnifyingGlass from '../../icons/search-button.ico';
import locationsIcon from '../../icons/search-location-icon.ico';
import cuisinesIcon from '../../icons/search-cuisines-icon.ico';
import restaurantsIcon from '../../icons/search-restaurants-icon.ico';

import dayjs from 'dayjs';
import './SearchResults.css';


function SearchResults() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const allRestaurants = useSelector(state => Object.values(state.restaurants));
    const params = new URLSearchParams(location.search);
    const searchDate = params.get('date');
    const searchTime = params.get('time');
    const searchPartySize = params.get('partySize');
    const search = params.get('searchInput');
    const locationSearch = params.get('location');
    const cuisineSearch = params.get('cuisine');

    const [date, setDate] = useState(searchDate);
    const [time, setTime] = useState(searchTime);
    const [partySize, setPartySize] = useState(searchPartySize);
    const [searchInput, setSearchInput] = useState("");


    let filteredRestaurants;

    if (search) {
        let restaurantsByName = allRestaurants
            .filter(restaurant => restaurant.name.toLowerCase().includes(search.toLowerCase()));

        let restaurantsByLocation = allRestaurants
            .filter(restaurant => restaurant.neighborhood.toLowerCase().includes(search.toLowerCase()));

        let restaurantsByCuisine = allRestaurants
            .filter(restaurant => restaurant.cuisines.toLowerCase().includes(search.toLowerCase()));

        const filteredRestaurantsWithDuplicates = restaurantsByName.concat(restaurantsByLocation, restaurantsByCuisine);
        filteredRestaurants = [...new Set(filteredRestaurantsWithDuplicates)];
    }

    if (locationSearch) {
        filteredRestaurants = allRestaurants
            .filter(restaurant => restaurant.neighborhood.includes(locationSearch));
    }

    if (cuisineSearch) {
        filteredRestaurants = allRestaurants
            .filter(restaurant => restaurant.cuisines.includes(cuisineSearch));
    }

    if (!search && !locationSearch && !cuisineSearch) {
        filteredRestaurants = allRestaurants;
    }


    const allLocations = () => {
        let uniqueLocations = [];

        allRestaurants.forEach(restaurant => {
            uniqueLocations.push(restaurant.neighborhood)
        })
        return [...new Set(uniqueLocations)];
    }


    const locationsArr = allLocations();
    const locations = locationsArr
        .filter(location => location.toLowerCase().includes(searchInput.toLowerCase()));


    const restaurantsByName = allRestaurants
        .filter(restaurant => restaurant.name.toLowerCase().includes(searchInput.toLowerCase()));
    const restaurants = [...new Set(restaurantsByName)];


    const allCuisines = () => {
        let uniqueCuisines = [];

        allRestaurants.forEach(restaurant => {
            uniqueCuisines.push(restaurant.cuisines.split(', ')[0])
        })
        return [...new Set(uniqueCuisines)];
    }
    const cuisinesArr = allCuisines();
    const cuisines = cuisinesArr
        .filter(cuisine => cuisine.toLowerCase().includes(searchInput.toLowerCase()));


    const averageRating = (reviews) => {
        let sum = 0;

        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            sum += review.rating;
        }
        return sum / reviews.length;
    }

    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [dispatch]);


    const closeSearchResults = () => {
        setSearchInput("");
    }

    useEffect(() => {
        if (!searchInput) return;

        window.addEventListener('click', closeSearchResults);
        return () => window.removeEventListener("click", closeSearchResults);
    }, [searchInput]);


    const routeToRestaurantProfile = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}`);
        setSearchInput("");
    }

    const routeToSearchResults = () => {
        history.push(`/search-results?date=${dayjs(date).format("YYYY-MM-DD")}&time=${time}&partySize=${partySize}&searchInput=${searchInput}`);
        setSearchInput("");
    }

    const routeToLocationResults = (location) => {
        history.push(`/search-results?date=${dayjs(date).format("YYYY-MM-DD")}&time=${time}&partySize=${partySize}&location=${location}`);
        setSearchInput("");
    }

    const routeToCuisineResults = (cuisine) => {
        history.push(`/search-results?date=${dayjs(date).format("YYYY-MM-DD")}&time=${time}&partySize=${partySize}&cuisine=${cuisine}`);
        setSearchInput("");
    }



    return (
        <div className="search-results-search-bar-and-results-container">
            <div className="search-results-search-bar-container">
                <div className="search-results-search-bar-date-time-party-container">
                    <div className="search-results-search-bar-date-input-container">
                        <div>
                            <img src={reservationDateIcon} className="search-results-search-bar-reservation-date-icon" alt="" />
                        </div>
                        <div className="search-results-search-bar-reservation-date">
                            <select className="search-results-search-bar-reservation-date-select">
                                <option value={dayjs(date).format("YYYY-MM-DD")}>{dayjs(date).format("MMM D, YYYY")}</option>
                            </select>
                        </div>
                    </div>
                    <div className="search-results-search-bar-time-input-container">
                        <img src={clockIcon} className="search-results-search-bar-clock-icon" alt="" />
                        <select value={time} onChange={e => setTime(e.target.value)}
                            className="search-results-search-bar-time-select">
                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="13:30">1:30 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="14:30">2:30 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="15:30">3:30 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="16:30">4:30 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="17:30">5:30 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="18:30">6:30 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="19:30">7:30 PM</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="20:30">8:30 PM</option>
                            <option value="21:00">9:00 PM</option>
                            <option value="21:30">9:30 PM</option>
                            <option value="22:00">10:00 PM</option>
                        </select>
                    </div>
                    <div className="search-results-search-bar-party-size-container">
                        <img src={personIcon} className="search-results-search-bar-person-icon" alt="" />
                        <select value={partySize} onChange={e => setPartySize(e.target.value)}
                            className="search-results-search-bar-party-size-select">
                            <option value="1">1 person</option>
                            <option value="2">2 people</option>
                            <option value="3">3 people</option>
                            <option value="4">4 people</option>
                            <option value="5">5 people</option>
                            <option value="6">6 people</option>
                            <option value="7">7 people</option>
                            <option value="8">8 people</option>
                            <option value="9">9 people</option>
                            <option value="10">10 people</option>
                            <option value="11">11 people</option>
                            <option value="12">12 people</option>
                            <option value="13">13 people</option>
                            <option value="14">14 people</option>
                            <option value="15">15 people</option>
                            <option value="16">16 people</option>
                            <option value="17">17 people</option>
                            <option value="18">18 people</option>
                            <option value="19">19 people</option>
                            <option value="20">20 people</option>
                        </select>
                    </div>
                </div>
                <div className="search-results-search-bar-text-input-and-results-container">
                    <div className="search-results-search-bar-search-outer-container">
                        <div>
                            <img src={magnifyingGlass} className="search-results-search-bar-magnifying-glass-icon" alt="" />
                        </div>
                        <div className="search-results-search-bar-search-container">
                            <input className="search-results-search-bar-search-input"
                                type="search"
                                placeholder="Location, Restaurant, or Cuisine"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)} />
                        </div>
                    </div>
                    <div className="search-results-search-bar-results-container-div">
                        {searchInput &&
                            <div className="search-results-search-bar-search-results-container">
                                <div className="search-bar-search-text-container">
                                    <div className="search-bar-search-text" onClick={routeToSearchResults}>
                                        Search : "<strong>{searchInput}</strong>"
                                    </div>
                                </div>
                                {locations.length > 0 &&
                                    <div className="search-bar-locations-container">
                                        <div className="search-bar-locations-text-container">
                                            <img src={locationsIcon} className="search-bar-locations-icon" />
                                            <div className="search-bar-locations-text">Locations</div>
                                        </div>
                                        <div className="search-bar-locations-results-container">
                                            {locations.map(location => (
                                                <div key={location} className="search-bar-locations-results"
                                                    onClick={() => routeToLocationResults(location)}>
                                                    <div className="search-bar-locations-results-text">
                                                        {location}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {cuisines.length > 0 &&
                                    <div className="search-bar-cuisines-container">
                                        <div className="search-bar-cuisines-text-container">
                                            <img src={cuisinesIcon} className="search-bar-cuisines-icon" />
                                            <div className="search-bar-cuisines-text">Cuisines</div>
                                        </div>
                                        <div className="search-bar-cuisines-results-container">
                                            {cuisines.map(cuisine => (
                                                <div key={cuisine} className="search-bar-cuisines-results"
                                                    onClick={() => routeToCuisineResults(cuisine)}>
                                                    <div className="search-bar-cuisines-results-text">
                                                        {cuisine}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {restaurants.length > 0 &&
                                    <div className="search-bar-restaurants-container">
                                        <div className="search-bar-restaurants-text-container">
                                            <img src={restaurantsIcon} className="search-bar-restaurants-icon" />
                                            <div className="search-bar-restaurants-text">Restaurants</div>
                                        </div>
                                        <div className="search-bar-restaurants-results-container">
                                            {restaurants.map(restaurant => (
                                                <div key={restaurant.id} className="search-bar-restaurants-results"
                                                    onClick={() => routeToRestaurantProfile(restaurant.id)}>
                                                    <div className="search-bar-restaurants-results-text">
                                                        {restaurant.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <button onClick={routeToSearchResults} className="search-results-search-bar-search-button">
                            Find a table
                        </button>
                    </div>
                </div>
            </div>

            <div className="search-results-restaurant-results-container">
                <div className="search-results-restaurant-results-upper">
                    {search
                        ?
                        <div className="search-results-upper-heading">
                            <div className="search-results-upper-search-text">
                                You searched for "{search}" in Los Angeles
                            </div>
                            <div className="search-results-upper-number-results-text">
                                {filteredRestaurants.length} restaurants match "{search}"
                            </div>
                        </div>
                        :
                        <div className="search-results-number-restaurants-available">
                            {filteredRestaurants.length} restaurants available
                        </div>
                    }
                </div>
                <div className="search-results-restaurant-results-lower">
                    <div className="search-results-restaurant-results-border">

                    </div>
                    {filteredRestaurants &&
                        filteredRestaurants.map(restaurant => (
                            <div className="search-results-restaurant-result-container">
                                <div className="search-results-restaurant-result-left">
                                    <div><img src={restaurant.preview_img} className="search-results-restaurant-result-preview-image" /></div>
                                </div>
                                <div className="search-results-restaurant-result-right">
                                    <div>
                                        {restaurant.name}
                                    </div>
                                    <div>
                                        {restaurant.reviews
                                            ?
                                            <span>{averageRating(restaurant.reviews).toFixed(1) >= 0.1 &&
                                                averageRating(restaurant.reviews).toFixed(1) < 1.6 &&
                                                <span className="gold-star search-results-star">★ <span className="gray-star search-results-star">★ ★ ★ ★</span>
                                                    <span className="search-results-rating-text">
                                                        &nbsp;&nbsp;Good<span>&nbsp;&nbsp;({restaurant.reviews.length})</span></span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 1.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 2.6 &&
                                                    <span className="gold-star search-results-star">★ ★ <span className="gray-star search-results-star">★ ★ ★</span>
                                                        <span className="search-results-rating-text">
                                                            &nbsp;&nbsp;Excellent<span>&nbsp;&nbsp;({restaurant.reviews.length})</span></span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 2.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 3.6 &&
                                                    <span className="gold-star search-results-star">★ ★ ★ <span className="gray-star search-results-star">★ ★</span>
                                                        <span className="search-results-rating-text">
                                                            &nbsp;&nbsp;Very Good<span>&nbsp;&nbsp;({restaurant.reviews.length})</span></span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 3.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 4.6 &&
                                                    <span className="gold-star search-results-star">★ ★ ★ ★ <span className="gray-star search-results-star">★</span>
                                                        <span className="search-results-rating-text">
                                                            &nbsp;&nbsp;Awesome<span>&nbsp;&nbsp;({restaurant.reviews.length})</span></span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 4.6 &&
                                                    <span className="gold-star search-results-star">★ ★ ★ ★ ★<span className="search-results-rating-text">
                                                        &nbsp;&nbsp;Exceptional<span>&nbsp;&nbsp;({restaurant.reviews.length})</span></span></span>}
                                            </span>
                                            :
                                            <span className="gray-star search-results-star">★ ★ ★ ★ ★</span>
                                        }
                                    </div>

                                </div>
                            </div>
                        ))}
                        {filteredRestaurants.length === 0 &&
                        <div>We didn't find a match for your search</div>
                        }
                </div>
                <div>

                </div>

            </div>
        </div>
    )
}




export default SearchResults;