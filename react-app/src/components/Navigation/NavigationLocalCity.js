import underNavLineBreak from '../../icons/under-nav-linebreak.ico';
import './NavigationLocalCity.css';


function NavigationLocalCity() {

    return (
        <div className="under-nav">
            <div className="under-nav-home">
                Home
            </div>
            <div>
                <img src={underNavLineBreak} className="under-nav-line-break-icon" alt="" />
            </div>
            <div className="under-nav-us">
                United States
            </div>
            <div>
                <img src={underNavLineBreak} className="under-nav-line-break-icon" alt="" />
            </div>
            <div className="under-nav-l-a">
                Los Angeles
            </div>
        </div>
    )
}



export default NavigationLocalCity;