import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import reservationDateIcon from '../../icons/upcoming-reservations-icon.ico';
import magnifyingGlass from '../../icons/search-button.ico';
import clockIcon from '../../icons/clock-icon.ico';
import downCarrot from '../../icons/down-carrot.ico';
import personIcon from '../../icons/person-icon.ico';
import locationsIcon from '../../icons/search-location-icon.ico';
import restaurantsIcon from '../../icons/search-restaurants-icon.ico';
import cuisinesIcon from '../../icons/search-cuisines-icon.ico';
import dayjs from 'dayjs';
import './SearchBar.css'


function SearchBar() {
    const history = useHistory();
    const allRestaurants = useSelector(state => Object.values(state.restaurants));

    const [date, setDate] = useState(dayjs().add(1, "day").format("MMM D, YYYY"));
    const [time, setTime] = useState("11:00");
    const [partySize, setPartySize] = useState(2);
    const [search, setSearch] = useState("");


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


    const filteredRestaurants = allRestaurants
        .filter(restaurant => restaurant.name.toLowerCase().includes(search.toLowerCase()));
    const restaurants = [...new Set(filteredRestaurants)];


    const allCuisines = () => {
        let uniqueCuisines = [];

        allRestaurants.forEach(restaurant => {
            uniqueCuisines.push(restaurant.cuisines.split(', ')[0])
        })
        return [...new Set(uniqueCuisines)];
    }
    const cuisinesArr = allCuisines();
    const cuisines = cuisinesArr
        .filter(cuisine => cuisine.toLowerCase().includes(search.toLowerCase()));


    const closeSearchResults = () => {
        setSearch("");
    }

    useEffect(() => {
        if (!search) return;

        window.addEventListener('click', closeSearchResults);
        return () => window.removeEventListener("click", closeSearchResults);
    }, [search]);


    const routeToRestaurantProfile = (restaurantId) => {
        history.push(`/restaurants/${restaurantId}`)
    }

    const routeToSearchResults = () => {
        history.push(`/search-results?date=${dayjs(date).format("YYYY-MM-DD")}&time=${time}&partySize=${partySize}&search=${search}`)
    }

    const routeToLocationResults = (location) => {
        history.push(`/search-results?date=${dayjs(date).format("YYYY-MM-DD")}&time=${time}&partySize=${partySize}&location=${location}`)
    }

    const routeToCuisineResults = (cuisine) => {
        history.push(`/search-results?date=${dayjs(date).format("YYYY-MM-DD")}&time=${time}&partySize=${partySize}&cuisine=${cuisine}`)
    }



    return (
        <div className="search-bar-container">
            <div className="search-bar-heading">
                <h1>Find your table for any occasion</h1>
            </div>
            <div className="search-bar-lower-container">
                {/* <form> */}
                <div className="search-bar-lower">
                    <div className="search-bar-date-time-party-container">
                        <div className="search-bar-date-input-container">
                            <div>
                                <img src={reservationDateIcon} className="search-bar-reservation-date-icon" alt="" />
                            </div>
                            <div className="search-bar-reservation-date">
                                <select className="search-bar-reservation-date-select">
                                    <option value={dayjs(date).format("YYYY-MM-DD")}>{dayjs(date).format("MMM D, YYYY")}</option>
                                </select>
                            </div>
                        </div>
                        <div className="search-bar-time-input-container">
                            <img src={clockIcon} className="search-bar-clock-icon" alt="" />
                            <select value={time} onChange={e => setTime(e.target.value)}
                                className="search-bar-time-select">
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
                        <div className="search-bar-party-size-container">
                            <img src={personIcon} className="search-bar-person-icon" alt="" />
                            <select value={partySize} onChange={e => setPartySize(e.target.value)}
                                className="search-bar-party-size-select">
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
                                {/* <option value="21">Larger party</option> */}
                            </select>
                        </div>
                    </div>
                    <div className="search-bar-text-input-container">
                        <div>
                            <img src={magnifyingGlass} className="search-bar-magnifying-glass-icon" alt="" />
                        </div>
                        <div className="search-bar-search-container">
                            <input className="search-bar-search-input"
                                type="search"
                                placeholder="Location, Restaurant, or Cuisine"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button onClick={routeToSearchResults} className="search-bar-search-button">
                            Let's go
                        </button>
                    </div>
                </div>
                {/* </form> */}
                {search &&
                    <div className="search-bar-search-results-container">
                        <div className="search-bar-search-text-container">
                            <div className="search-bar-search-text">
                                Search : "<strong>{search}</strong>"
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
    )
}


export default SearchBar;