import React, { useState } from 'react'
import { elastic as Menu } from "react-burger-menu";
import NavLinks from './NavLinks';
const SideMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="relative z-50 md:hidden">
            <Menu
                isOpen={menuOpen}
                onStateChange={handleStateChange}
                right // sağdan gelsin istersen bunu sil
            >
                <NavLinks className="flex-col items-start" onClick={closeMenu} />
            </Menu>
        </div>
    );
}

export default SideMenu