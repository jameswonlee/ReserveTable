import { useState } from 'react';
import reservationDateIcon from '../../icons/upcoming-reservations-icon.ico';
import magnifyingGlass from '../../icons/search-button.ico';
import clockIcon from '../../icons/clock-icon.ico';
import downCarrot from '../../icons/down-carrot.ico';
import personIcon from '../../icons/person-icon.ico';
import dayjs from 'dayjs';
import './SearchBar.css'


function SearchBar() {

    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))


    return (
        <div className="search-bar-container">
            <div className="search-bar-heading">
                <h1>Find your table for any occasion</h1>
            </div>
            <div className="search-bar-lower-container">
                <form>
                    <div className="search-bar-lower">
                        <div className="search-bar-date-time-party-container">
                            <div className="search-bar-date-input-container">
                                {/* <input
                                    type="date"
                                    value={date}
                                    className="search-bar-date-input"
                                /> */}
                                <div>
                                    <img src={reservationDateIcon} className="search-bar-reservation-date-icon" alt="" />
                                </div>
                                <div className="search-bar-reservation-date-text">Dec 17, 2022</div>
                                <div>
                                    <img src={downCarrot} className="search-bar-down-carrot-icon" alt=""/>
                                </div>
                            </div>
                            <div className="search-bar-time-input-container">
                                <img src={clockIcon} className="search-bar-clock-icon" alt=""/>
                                <select className="search-bar-time-select">
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
                                <img src={personIcon} className="search-bar-person-icon" alt=""/>
                                <select className="search-bar-party-size-select">
                                    {/* <option value="1">1 person</option> */}
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
                                    <option value="21">Larger party</option>
                                </select>
                            </div>
                        </div>
                        <div className="search-bar-cuisine-text-container">
                            <div>
                                <img src={magnifyingGlass} className="search-bar-magnifying-glass-icon" alt="" />
                            </div>
                            <div className="search-bar-search-text">
                                <text>Location, Restaurant, or Cuisine</text>
                            </div>
                        </div>
                        <div>
                            <button className="search-bar-button">
                                Let's go
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SearchBar;