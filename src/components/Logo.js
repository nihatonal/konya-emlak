import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Logo = ({ className, logoClass }) => {
    const location = useLocation();
    const lng = location.pathname.split("/")[1];
    return (
        <div className={`logo-wrapper ${className} `}>
            <h1 className={`logo-text ${logoClass}`}>
                <NavLink to={`${lng}/`}>
                    Bağ Bahçe Yatırım
                </NavLink></h1>
        </div>
    );
};

export default Logo;