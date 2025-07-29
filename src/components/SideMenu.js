import React, { useState } from 'react'
import { elastic as Menu } from "react-burger-menu";
import NavLinks from './NavLinks';
import Socials from './Socials';
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
                <NavLinks className="flex-col items-start"
                    classDropNav="text-bvs-lightGreen"
                    classDropNavItem="drop-nav-item"
                    onClick={closeMenu} />
                <div className="mt-10">
                    <Socials className="flex justify-end itmes-end gap-3"
                        classIcon={`bg-bvs-darkGreen text-bvs-softGreen hover:bg-bvs-accentGold`}
                    />
                </div>
            </Menu>
        </div>
    );
}

export default SideMenu