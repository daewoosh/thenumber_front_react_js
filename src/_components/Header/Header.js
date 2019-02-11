import React from 'react';
import './Header.less';
import { HeaderLogin } from './HeaderLogin';

export class Header extends React.Component {

    goHome = () => {
        document.location.hash = '/home';
    }

    render() {
        return (
            <div className="header">
                <div className="header-content">
                    <div className="logo" onClick={this.goHome}>
                        <img src='assets/img/the_number.svg' />
                    </div>
                    <div className="header-nav">
                        <ul className="nav-links">
                            {/* <li><a href=''>Финансовый план</a></li>
                            <li><a href=''>Блог</a></li>
                            <li><a href=''>О проекте</a></li> */}
                        </ul>
                    </div>
                    <HeaderLogin />
                </div>
            </div>
        );
    }
}