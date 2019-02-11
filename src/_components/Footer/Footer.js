import React from 'react';
import './Footer.less';

export class Footer extends React.Component {

    render() {
        const currentYear = new Date().getFullYear();
        return (
            <div className="footer">
                <div className="footer-content">
                    <div className="footer-copyright">
                        &#9400; {currentYear} The Number
                    </div>
                    <div className="footer-nav">
                        <ul className="nav-links">
                            {/* <li><a href='' className="white">О нас</a></li>
                            <li><a href='' className="white">Цены</a></li> */}
                            <li><a href='' className="white">Оферта</a></li>
                            {/* <li><a href='' className="white">Блог</a></li> */}
                            <li><a href='' className="white">Контакты</a></li>
                        </ul>
                    </div>
                    {/* <div className="footer-social">
                        <ul className="nav-links">
                            <li><a href=''><img src="assets/img/fb.svg"/></a></li>
                            <li><a href=''><img src="assets/img/twitter.svg"/></a></li>
                            <li><a href=''><img src="assets/img/instagram.svg"/></a></li>
                            <li><a href=''><img src="assets/img/youtube.svg"/></a></li>                            
                        </ul>
                    </div> */}
                </div>
            </div>
        );
    }
}