import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAllRestaurants } from "../../store/restaurants";
import reservationDateIcon from '../../icons/upcoming-reservations-icon.ico';
import downCarrot from '../../icons/down-carrot.ico';
import clockIcon from '../../icons/clock-icon.ico';
import personIcon from '../../icons/person-icon.ico';
import magnifyingGlass from '../../icons/search-button.ico';
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
    const nameSearch = params.get('search');
    const locationSearch = params.get('location');
    const cuisineSearch = params.get('cuisine');

    const [date, setDate] = useState(searchDate);
    const [time, setTime] = useState(searchTime);
    const [partySize, setPartySize] = useState(searchPartySize);
    const [search, setSearch] = useState("")


    let filteredRestaurants;

    if (nameSearch) {
        filteredRestaurants = allRestaurants
            .filter(restaurant => restaurant.name.toLowerCase().includes(nameSearch.toLowerCase()));
    }


    if (locationSearch) {
        filteredRestaurants = allRestaurants
            .filter(restaurant => restaurant.neighborhood.includes(locationSearch));
    }


    if (cuisineSearch) {
        filteredRestaurants = allRestaurants
            .filter(restaurant => restaurant.cuisines.includes(cuisineSearch));
    }

    const routeToSearchResults = () => {
        history.push(`/search-results?date=${dayjs(date).format("YYYY-MM-DD")}&time=${time}&partySize=${partySize}&search=${search}`)
    }


    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [dispatch]);



    return (
        <div>
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
                            {/* <option value="21">Larger party</option> */}
                        </select>
                    </div>
                </div>
                <div className="search-results-search-bar-text-input-container">
                    <div>
                        <img src={magnifyingGlass} className="search-results-search-bar-magnifying-glass-icon" alt="" />
                    </div>
                    <div className="search-results-search-bar-search-container">
                        <input className="search-results-search-bar-search-input"
                            type="search"
                            placeholder="Location, Restaurant, or Cuisine"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}/>
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
        </div>
    )
}




export default SearchResults;