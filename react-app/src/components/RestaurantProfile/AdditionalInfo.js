import crossStreetIcon from './icons/cross-street-icon.ico';
import neighborhoodIcon from './icons/neighborhood-icon.ico';
import operationHoursIcon from './icons/operation-hours-icon.ico';
import cuisinesIcon from './icons/cuisines-icon.ico';
import diningStyleIcon from './icons/dining-style-icon.ico';
import dressCodeIcon from './icons/dress-code-icon.ico';
import parkingDetailsIcon from './icons/parking-details-icon.ico';
import paymentOptionsIcon from './icons/payment-options-icon.ico';
import websiteIcon from './icons/website-icon.ico';
import phoneNumberIcon from './icons/phone-number-icon.ico';
import './AdditionalInfo.css';



function AdditionalInfo({ restaurant }) {

    return (
        <div className="additional-information-container">
            <div className="additional-information-header">
                Additonal information
            </div>
            <div className="additional-information">
                <div className="cross-street-container">
                    <div className="cross-street-left">
                        <img src={crossStreetIcon} className="cross-street-icon" />
                    </div>
                    <div className="cross-street-right">
                        <div className="cross-street-label">
                            Cross street
                        </div>
                        <div className="cross-street-details">
                            {restaurant.cross_street}
                        </div>
                    </div>
                </div>
                <div className="neighborhood-container">
                    <div className="neighborhood-left">
                        <img src={neighborhoodIcon} className="neighborhood-icon" />
                    </div>
                    <div className="neighborhood-right">
                        <div className="neighborhood-label">
                            Neighborhood
                        </div>
                        <div className="cross-street-details">
                            {restaurant.neighborhood}
                        </div>
                    </div>
                </div>
                <div className="operation-hours-container">
                    <div className="operation-hours-left">
                        <img src={operationHoursIcon} className="operation-hours-icon" />
                    </div>
                    <div className="operation-hours-right">
                        <div className="operation-hours-label">
                            Hours of operation
                        </div>
                        <div className="operation-hours-details">
                            {restaurant.operation_hours}
                        </div>
                    </div>
                </div>
                <div className="cuisines-container">
                    <div className="cuisines-left">
                        <img src={cuisinesIcon} className="cuisines-icon" />
                    </div>
                    <div className="cuisines-right">
                        <div className="cuisines-label">
                            Cuisines
                        </div>
                        <div className="cuisines-details">
                            {restaurant.cuisines}
                        </div>
                    </div>
                </div>
                <div className="dining-style-container">
                    <div className="dining-style-left">
                        <img src={diningStyleIcon} className="dining-style-icon" />
                    </div>
                    <div className="dining-style-right">
                        <div className="dining-style-label">
                            Dining style
                        </div>
                        <div className="dining-style-details">
                            {restaurant.dining_style}
                        </div>
                    </div>
                </div>
                <div className="dress-code-container">
                    <div className="dress-code-left">
                        <img src={dressCodeIcon} className="dress-code-icon" />
                    </div>
                    <div className="dress-code-right">
                        <div className="dress-code-label">
                            Dress code
                        </div>
                        <div className="dress-code-details">
                            {restaurant.dress_code}
                        </div>
                    </div>
                </div>
                <div className="parking-details-container">
                    <div className="parking-details-left">
                        <img src={parkingDetailsIcon} className="parking-details-icon" />
                    </div>
                    <div className="parking-details-right">
                        <div className="parking-details-label">
                            Parking details
                        </div>
                        <div className="parking-details">
                            {restaurant.parking_details}
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-options-container">
                <div className="payment-options-left">
                    <img src={paymentOptionsIcon} className="payment-options-icon" />
                </div>
                <div className="payment-options-right">
                    <div className="payment-options-label">
                        Payment options
                    </div>
                    <div className="payment-options-details">
                        {restaurant.payment_options}
                    </div>
                </div>
            </div>
            <div className="website-container">
                <div className="website-left">
                    <img src={websiteIcon} className="website-icon" />
                </div>
                <div className="website-right">
                    <div className="website-label">
                        Parking details
                    </div>
                    <div className="website-details">
                        {restaurant.website}
                    </div>
                </div>
            </div>
            <div className="phone-number-container">
                <div className="phone-number-left">
                    <img src={phoneNumberIcon} className="phone-number-icon" />
                </div>
                <div className="phone-number-right">
                    <div className="phone-number-label">
                        Phone number
                    </div>
                    <div className="phoner-number-details">
                        {restaurant.phone}
                    </div>
                </div>
            </div>


        </div>
    )
}



export default AdditionalInfo;