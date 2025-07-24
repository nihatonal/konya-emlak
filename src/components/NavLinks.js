import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

const NavLinks = ({ className, onClick, classNavItem, classDropNav, classDropNavItem }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const lng = location.pathname.split("/")[1];
    const isInvestment = /^\/(tr|en)?\/?(neden-bag-yatirimi|bag-alim-sureci|bag-isletme|why-vineyard-investment|buying-process|vineyard-management)\/?$/.test(location.pathname);

    const navlinks = [
        { id: "home", to: { tr: "/", en: "/" }, label: t("nav.home") },
        { id: "baglarimiz", to: { tr: "/baglarimiz", en: "/vineyards" }, label: t("nav.vineyards") },
        {
            id: "yatirim",
            label: t("nav.investment"), // Örn: "Yatırım"
            submenu: [
                {
                    id: "yatirim",
                    to: { tr: "/neden-bag-yatirimi", en: "/why-vineyard-investment" },
                    label: t("nav.vineyardInvestment") // Örn: "Bağ yatirimi"
                },
                {
                    id: "alim",
                    to: { tr: "/bag-alim-sureci", en: "/buying-process" },
                    label: t("nav.buyingProcess") // Örn: "Bağ Alım Süreci"
                },
                {
                    id: "isletme",
                    to: { tr: "/bag-isletme", en: "/vineyard-management" },
                    label: t("nav.managementModel") // Örn: "Bağ İşletme Modeli"
                }
            ]
        },
        { id: "hakkimizda", to: { tr: "/hakkimizda", en: "/about-us" }, label: t("nav.about") },
        { id: "iletisim", to: { tr: "/iletisim", en: "/contact" }, label: t("nav.contact") },
        { id: "blog", to: { tr: "/blog", en: "/blog" }, label: t("nav.blog") }
    ];

    return (
        <nav className={`flex md:space-x-8 text-bvs-darkGreen font-medium ${className}`}>
            {navlinks.map(({ id, to, label, submenu }) =>
                submenu ? (
                    <div key={id} className="relative group">
                        <span className={`cursor-pointer link-underline ${classDropNav} ${isInvestment ? 'link-underline-active' : 'hover:after:scale-x-100'}`}>
                            {label}
                        </span>
                        <div className="absolute left-0 top-5 hidden group-hover:block bg-white shadow-md mt-2 overflow-hidden rounded z-50">
                            {submenu.map((item) => (
                                <NavLink
                                    key={item.id}
                                    to={`/${lng}${item.to[lng]}`}
                                    className={({ isActive }) =>
                                        `block whitespace-nowrap px-4 py-2 text-sm ${classDropNavItem} ${isActive ?
                                            'bg-bvs-darkGreen/60 font-semibold text-white' : 'hover:bg-bvs-lightGreen'
                                        }`
                                    }
                                    onClick={onClick}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ) : (
                    <NavLink
                        key={id}
                        to={`/${lng}${to[lng]}`}
                        end={to?.[lng] === "/"}
                        className={({ isActive }) =>
                            `link-underline text-bvs-lightGreen ${classNavItem} ${isActive ? 'link-underline-active' : 'hover:after:scale-x-100'
                            }`
                        }
                        onClick={onClick}
                    >
                        {label}
                    </NavLink>
                )
            )}
        </nav>
    );
};

export default NavLinks;
