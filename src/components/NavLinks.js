import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
const NavLinks = ({ className, onClick, classNavItem }) => {
    const { t, i18n } = useTranslation();

    const navlinks = [
        { id: "home", to: "/", label: t("nav.home") },
        { id: "baglarimiz", to: "/konya-bozkir-hamzalar-baglarimiz", label: t("nav.vineyards") },
        { id: "hakkimizda", to: "/hakkimizda", label: t("nav.about") },
        { id: "iletisim", to: "/iletisim", label: t("nav.contact") },
        { id: "blog", to: "/blog", label: t("nav.blog") },
    ];
    return (
        <nav className={`flex md:space-x-8 text-bvs-darkGreen font-medium ${className}`}>
            {navlinks.map(({ to, label }) => (
                <NavLink
                    key={to}
                    className={({ isActive }) =>
                        `link-underline text-bvs-lightGreen ${classNavItem} ${isActive
                            ? 'link-underline-active'
                            : 'hover:after:scale-x-100'
                        }`
                    }
                    to={to}
                    onClick={onClick}
                >
                    <span></span>{label}
                </NavLink>
            ))}
        </nav>
    )
}

export default NavLinks