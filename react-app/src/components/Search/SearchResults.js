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
import bookingSymbol from '../../icons/booking-symbol.ico';
import downCaret from '../../icons/down-caret.ico';

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

    const [date, setDate] = useState(dayjs(searchDate).format("YYYY-MM-DD") || dayjs().add(1, "day").format("MMM D, YYYY"));
    const [time, setTime] = useState(searchTime || "18:00");
    const [partySize, setPartySize] = useState(searchPartySize || 2);
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

    const routeToReviews = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}?review=true`);
    }

    const routeToReservations = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}/reservations?date=${date}&time=${dayjs(`${date} ${time}`).format("HH:mm")}&partySize=${partySize}`);
    }

    const routeToReservationsMinus30 = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}/reservations?date=${date}&time=${dayjs(`${date} ${time}`).subtract(30, 'minute').format("HH:mm")}&partySize=${partySize}`);
    }

    const routeToReservationsMinus60 = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}/reservations?date=${date}&time=${dayjs(`${date} ${time}`).subtract(60, 'minute').format("HH:mm")}&partySize=${partySize}`);
    }

    const routeToReservationsPlus30 = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}/reservations?date=${date}&time=${dayjs(`${date} ${time}`).add(30, 'minute').format("HH:mm")}&partySize=${partySize}`);
    }

    const routeToReservationsPlus60 = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}/reservations?date=${date}&time=${dayjs(`${date} ${time}`).add(60, 'minute').format("HH:mm")}&partySize=${partySize}`);
    }

    const randomNumGenerator = (num) => {
        return Math.floor(Math.random() * num)
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
                            <img src={downCaret} className="search-results-date-down-caret" />
                            <select value={date} onChange={e => setDate(e.target.value)} className="search-results-search-bar-reservation-date-select">
                                <option value={dayjs().format("YYYY-MM-DD")}>{dayjs().format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(1, 'day').format("YYYY-MM-DD")}>{dayjs().add(1, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(2, 'day').format("YYYY-MM-DD")}>{dayjs().add(2, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(3, 'day').format("YYYY-MM-DD")}>{dayjs().add(3, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(4, 'day').format("YYYY-MM-DD")}>{dayjs().add(4, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(5, 'day').format("YYYY-MM-DD")}>{dayjs().add(5, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(6, 'day').format("YYYY-MM-DD")}>{dayjs().add(6, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(7, 'day').format("YYYY-MM-DD")}>{dayjs().add(7, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(8, 'day').format("YYYY-MM-DD")}>{dayjs().add(8, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(9, 'day').format("YYYY-MM-DD")}>{dayjs().add(9, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(10, 'day').format("YYYY-MM-DD")}>{dayjs().add(10, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(11, 'day').format("YYYY-MM-DD")}>{dayjs().add(11, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(12, 'day').format("YYYY-MM-DD")}>{dayjs().add(12, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(13, 'day').format("YYYY-MM-DD")}>{dayjs().add(13, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(14, 'day').format("YYYY-MM-DD")}>{dayjs().add(14, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(15, 'day').format("YYYY-MM-DD")}>{dayjs().add(15, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(16, 'day').format("YYYY-MM-DD")}>{dayjs().add(16, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(17, 'day').format("YYYY-MM-DD")}>{dayjs().add(17, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(18, 'day').format("YYYY-MM-DD")}>{dayjs().add(18, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(19, 'day').format("YYYY-MM-DD")}>{dayjs().add(19, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(20, 'day').format("YYYY-MM-DD")}>{dayjs().add(20, 'day').format("MMM D, YYYY")}</option>
                                <option value={dayjs().add(21, 'day').format("YYYY-MM-DD")}>{dayjs().add(21, 'day').format("MMM D, YYYY")}</option>                        </select>
                        </div>
                    </div>
                    <div className="search-results-search-bar-time-input-container">
                        <div>
                            <img src={clockIcon} className="search-results-search-bar-clock-icon" alt="" />
                        </div>
                        <div className="search-results-search-bar-reservation-time">
                            <img src={downCaret} className="search-results-time-down-caret" />
                            <select value={time} onChange={e => setTime(e.target.value)}
                                className="search-results-search-bar-time-select">
                                <option value="10:00">10:00 AM</option>
                                <option value="10:30">10:30 AM</option>
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
                    </div>
                    <div className="search-results-search-bar-party-size-container">
                        <div>
                            <img src={personIcon} className="search-results-search-bar-person-icon" alt="" />
                        </div>
                        <div className="search-results-search-bar-reservation-party-size">
                            <img src={downCaret} className="search-results-search-bar-party-size-down-caret" />
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
                            {filteredRestaurants.length === 1
                                ?
                                <div>
                                    {filteredRestaurants.length} restaurant available in Los Angeles
                                </div>
                                :
                                <div>
                                    {filteredRestaurants.length} restaurants available in Los Angeles
                                </div>
                            }
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
                                    <div onClick={() => routeToRestaurantProfile(restaurant.id)} className="search-results-restaurant-name-text">
                                        {restaurant.name}
                                    </div>
                                    <div className="search-results-rating-stars-container">
                                        {restaurant.reviews
                                            ?
                                            <span>{averageRating(restaurant.reviews).toFixed(1) >= 0.1 &&
                                                averageRating(restaurant.reviews).toFixed(1) < 1.6 &&
                                                <span className="gold-star search-results-star">★ <span className="gray-star search-results-star">★ ★ ★ ★</span>
                                                    <span className="search-results-rating-text">
                                                        &nbsp;&nbsp;Good&nbsp;&nbsp;<span onClick={() => routeToReviews(restaurant.id)} className="search-results-reviews-num">({restaurant.reviews.length})</span></span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 1.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 2.6 &&
                                                    <span className="gold-star search-results-star">★ ★ <span className="gray-star search-results-star">★ ★ ★</span>
                                                        <span className="search-results-rating-text">
                                                            &nbsp;&nbsp;Excellent&nbsp;&nbsp;<span onClick={() => routeToReviews(restaurant.id)} className="search-results-reviews-num">({restaurant.reviews.length})</span></span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 2.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 3.6 &&
                                                    <span className="gold-star search-results-star">★ ★ ★ <span className="gray-star search-results-star">★ ★</span>
                                                        <span className="search-results-rating-text">
                                                            &nbsp;&nbsp;Very Good&nbsp;&nbsp;<span onClick={() => routeToReviews(restaurant.id)} className="search-results-reviews-num">({restaurant.reviews.length})</span></span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 3.6 &&
                                                    averageRating(restaurant.reviews).toFixed(1) < 4.6 &&
                                                    <span className="gold-star search-results-star">★ ★ ★ ★ <span className="gray-star search-results-star">★</span>
                                                        <span className="search-results-rating-text">
                                                            &nbsp;&nbsp;Awesome&nbsp;&nbsp;<span onClick={() => routeToReviews(restaurant.id)} className="search-results-reviews-num">({restaurant.reviews.length})</span></span></span>}
                                                {averageRating(restaurant.reviews).toFixed(1) >= 4.6 &&
                                                    <span className="gold-star search-results-star">★ ★ ★ ★ ★<span className="search-results-rating-text">
                                                        &nbsp;&nbsp;Exceptional&nbsp;&nbsp;<span onClick={() => routeToReviews(restaurant.id)} className="search-results-reviews-num">({restaurant.reviews.length})</span></span></span>}
                                            </span>
                                            :
                                            <span className="gray-star search-results-star">★ ★ ★ ★ ★&nbsp;&nbsp;<span onClick={() => routeToReviews(restaurant.id)} className="search-results-rating-text search-results-reviews-num">(0)</span></span>
                                        }
                                    </div>
                                    <div className="search-results-cuisine-cost-neighborhood">
                                        {restaurant.cost === 1 && <span className="dark-gray-dollar large-dollar">$<span className="light-gray-dollar">$$$</span></span>}
                                        {restaurant.cost === 2 && <span className="dark-gray-dollar large-dollar">$$<span className="light-gray-dollar">$$</span></span>}
                                        {restaurant.cost === 3 && <span className="dark-gray-dollar large-dollar">$$$<span className="light-gray-dollar">$</span></span>}
                                        {restaurant.cost === 4 && <span className="dark-gray-dollar large-dollar">$$$$</span>}
                                        &nbsp; &#x2022; &nbsp;
                                        <span className="search-results-restaurant-cuisine">{restaurant.cuisines.split(',')[0]} </span>
                                        &nbsp;&#x2022;&nbsp;
                                        <span className="search-results-restaurant-neighborhood"> {restaurant.neighborhood}</span>
                                    </div>
                                    <div className="search-results-num-booked-container">
                                        <div>
                                            {restaurant.total_num_reservations > 0 &&
                                                <img src={bookingSymbol} className="search-results-booking-symbol" />
                                            }
                                        </div>
                                        <div className="search-results-total-num-bookings">
                                            {!restaurant.total_num_reservations &&
                                                <div className="search-results-total-bookings-zero"></div>
                                            }
                                            {restaurant.total_num_reservations > 0 &&
                                                (restaurant.total_num_reservations === 1
                                                    ?
                                                    <p>Booked {restaurant.total_num_reservations} time today</p>
                                                    :
                                                    <p>Booked {restaurant.total_num_reservations} times today</p>
                                                )}
                                        </div>
                                    </div>
                                    <div className="search-results-reservation-times-container">
                                        {dayjs(`${date} ${time}`).subtract(60, 'minute').format("h:mm A") !== "9:00 AM" &&
                                            dayjs(`${date} ${time}`).subtract(60, 'minute').format("h:mm A") !== "9:30 AM"
                                            ?
                                            <div>
                                                <div onClick={() => routeToReservationsMinus60(restaurant.id)} className="search-results-reservation-time">
                                                    {dayjs(`${date} ${time}`).subtract(60, 'minute').format("h:mm A")}
                                                </div>
                                                {randomNumGenerator(3) === 1 &&
                                                    <div className="search-results-bonus-points-text">+1,000 pts</div>
                                                }
                                            </div>
                                            :
                                            <div className="search-results-empty-timeslot">
                                            </div>
                                        }
                                        {dayjs(`${date} ${time}`).subtract(30, 'minute').format("h:mm A") !== "9:30 AM"
                                            ?
                                            <div>
                                                <div onClick={() => routeToReservationsMinus30(restaurant.id)} className="search-results-reservation-time">
                                                    {dayjs(`${date} ${time}`).subtract(30, 'minute').format("h:mm A")}
                                                </div>
                                                {randomNumGenerator(3) === 1 &&
                                                    <div className="search-results-bonus-points-text">+1,000 pts</div>
                                                }
                                            </div>
                                            :
                                            <div className="search-results-empty-timeslot">
                                            </div>
                                        }
                                        <div>
                                            <div onClick={() => routeToReservations(restaurant.id)} className="search-results-reservation-time">
                                                {dayjs(`${date} ${time}`).format("h:mm A")}
                                            </div>
                                            {randomNumGenerator(3) === 1 &&
                                                <div className="search-results-bonus-points-text">+1,000 pts</div>
                                            }
                                        </div>
                                        {dayjs(`${date} ${time}`).add(30, 'minute').format("h:mm A") !== "10:30 PM"
                                            ?
                                            <div>
                                                <div onClick={() => routeToReservationsPlus30(restaurant.id)} className="search-results-reservation-time">
                                                    {dayjs(`${date} ${time}`).add(30, 'minute').format("h:mm A")}
                                                </div>
                                                {randomNumGenerator(3) === 1 &&
                                                    <div className="search-results-bonus-points-text">+1,000 pts</div>
                                                }
                                            </div>
                                            :
                                            <div className="search-results-empty-timeslot">
                                            </div>
                                        }
                                        {dayjs(`${date} ${time}`).add(60, 'minute').format("h:mm A") !== "10:30 PM" &&
                                            dayjs(`${date} ${time}`).add(60, 'minute').format("h:mm A") !== "11:00 PM"
                                            ?
                                            <div>
                                                <div onClick={() => routeToReservationsPlus60(restaurant.id)} className="search-results-reservation-time">
                                                    {dayjs(`${date} ${time}`).add(60, 'minute').format("h:mm A")}
                                                </div>
                                                {randomNumGenerator(3) === 1 &&
                                                    <div className="search-results-bonus-points-text">+1,000 pts</div>
                                                }
                                            </div>
                                            :
                                            <div className="search-results-empty-timeslot">
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    {filteredRestaurants.length === 0 &&
                        <div className="search-results-no-results-container">
                            <div className="search-results-no-results-heading">We didn't find a match for your search</div>
                            <div className="search-results-no-results-text">Sorry, we couldn't find any results for {search}. Try checking your
                                spelling or using less specific keywords. There are no restaurants with availability within 30 miles of your search.</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default SearchResults;