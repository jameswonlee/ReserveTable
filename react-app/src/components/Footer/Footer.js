import angelList from '../../icons/angellist.ico';
import rightArrow from '../../icons/footer-right-arrow.ico';
import './Footer.css';


function Footer() {

    return (
        <footer>
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-top-left">
                        <div>
                            <div className="footer-tech-stack">
                                <div className="footer-tech-stack-text">
                                    TECH STACK
                                </div>
                                <div className="footer-below-tech-stack">
                                    <div>
                                        JavaScript
                                    </div>
                                    <div>
                                        Python
                                    </div>
                                    <div>
                                        React
                                    </div>
                                    <div>
                                        Redux
                                    </div>
                                    <div>
                                        Flask
                                    </div>
                                    <div>
                                        SQLAlchemy
                                    </div>
                                    <div>
                                        HTML5
                                    </div>
                                    <div>
                                        CSS3
                                    </div>
                                </div >
                            </div>
                        </div>
                        <div>
                            <div className="footer-hosting">
                                <div className="footer-hosting-text">
                                    HOSTING/DATABASE
                                </div>
                                <div className="footer-below-hosting">
                                    <div>
                                        PostgreSQL
                                    </div>
                                    <div>
                                        SQLite
                                    </div>
                                    <div>
                                        Render
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="footer-ides">
                                <div className="footer-ides-text">
                                    IDEs/Editors/Misc
                                </div>
                                <div className="footer-below-ides">
                                    <div>
                                        Xcode
                                    </div>
                                    <div>
                                        Visual Studio Code
                                    </div>
                                    <div>
                                        Adobe Photoshop
                                    </div>
                                    <div>
                                        Postman
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="footer-other-sites">
                                <div className="footer-other-sites-text">
                                    Other work by
                                    <a id="portfolio" className="portfolio-link" href="https://james-lee.io" target="_blank" rel="noreferrer">
                                        &nbsp;<span className="footer-name-text">James Lee</span>&nbsp;
                                    </a>
                                </div>
                                <div className="footer-below-other-sites">
                                    <div className="footer-other-site">
                                        <a id="ayrbnb" className="ayrbnb-link" href="https://ayrbnb.herokuapp.com" target="_blank" rel="noreferrer">
                                            ayrbnb.herokuapp.com
                                            <img src={rightArrow} className="footer-right-arrow ayrbnb-arrow" />
                                        </a>
                                    </div>
                                    <div className="footer-other-site">
                                        <a id="codebunny" className="codebunny-link" href="https://codebunny.onrender.com" target="_blank" rel="noreferrer">
                                            codebunny.onrender.com
                                            <img src={rightArrow} className="footer-right-arrow codebunny-arrow" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="footer-connect">
                            <div className="footer-connect-with-me-text">
                                LET'S CONNECT!
                            </div>
                            <div className="footer-below-connect">
                                <div className="footer-links">
                                    <a id="github" className="github-link" href="https://github.com/jameswonlee" target="_blank" rel="noreferrer">
                                        <i className="fa-brands fa-github fa-xl"></i>
                                    </a>
                                    <a id="linkedin" className="linkedin-link" href="https://www.linkedin.com/in/jameswonlee/" target="_blank" rel="noreferrer">
                                        <i className="fa-brands fa-linkedin fa-xl"></i>
                                    </a>
                                    <a id="angel-list" className="angel-list-link" href="https://angel.co/u/jameswonlee" target="_blank" rel="noreferrer">
                                        <img src={angelList} className=" f-brands angel-list-icon" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-terms">
                        <div>Privacy Policy</div>
                        <div>Terms of Use</div>
                        <div>Cookies and Interest-Based Ads</div>
                        <div>Do Not Sell</div>
                        <div>Cookies Settings</div>
                    </div>
                    <div className="footer-copyright">
                        Copyright © 2023 ReserveTable, Inc, an
                        <a id="opentable" className="opentable-link" href="https://www.opentable.com" target="_blank" rel="noreferrer">
                            &nbsp;<span className="footer-name-text-underline">OpenTable</span>&nbsp;
                        </a>
                        clone by<span className="footer-name-text">
                            <a id="portfolio" className="portfolio-link" href="https://james-lee.io" target="_blank" rel="noreferrer">
                                &nbsp;<span className="footer-name-text-underline">James Lee,</span>&nbsp;
                            </a>
                        </span> Los Angeles CA 90048 - All rights reserved.
                    </div>
                </div>
            </div>
        </footer >
    )
}


export default Footer;