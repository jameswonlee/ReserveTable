import { useState } from 'react';



function Reservations() {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [partySize, setPartySize] = useState('');



    return (
        <div>
            <h2>MAKE A RESERVATION</h2>

            <form>
                <div>
                    <input
                        type="select"
                        onChange={e => setPartySize(e.target.value)}
                        placeholder="Party Size"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        onChange={e => setDate(e.target.value)}
                        value={date}
                        placeholder="Date"
                    />
                </div>
                <div>
                    <input
                        type="time"
                        onChange={e => setTime(e.target.value)}
                        value={time}
                        placeholder="Time" />
                </div>
                <div>
                    <button
                        type="submit"
                    >
                        Find a time
                    </button>
                </div>

            </form>

        </div>
    )
}



export default Reservations;