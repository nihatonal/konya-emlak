import React, { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import { useTranslation } from 'react-i18next';
import SideMenu from './SideMenu';
import CallForm from './CallForm';

const Header = () => {
    const { t, i18n } = useTranslation();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className={`fixed top-0 z-[60] w-full flex items-center justify-between px-6 py-3 transition-all duration-300
            ${scrolled ? 'bg-bvs-deepGreen/60 backdrop-blur-md shadow-md' : 'bg-transparent'}
        `}>

            {/* Logo */}
            <div className="text-bvs-deepGreen font-bold text-xl">
                Bağ Yatırım
            </div>

            {/* Navigation */}
            <NavLinks className={`hidden md:flex`} />

            <div className='flex items-center justify-center gap-4'>
                {/* CTA Button */}
                <CallForm classButtonWrapper={"hidden md:flex"} btn_name={t("header.cta")} form_title={t("form.callFromTitle")} />

                {/* Language selecter */}
                <div className="flex gap-1 mr-4 md:mr-0">
                    <button className={`font-semibold hover:text-bvs-lightGreen ${i18n.language === "en" ? "text-bvs-accentGold" : "text-gray-400"}`} aria-label="Change language to English" onClick={() => changeLanguage("en")} >EN</button>
                    <button className={`font-semibold hover:text-bvs-lightGreen ${i18n.language === "tr" ? "text-bvs-accentGold" : "text-gray-400"}`} aria-label="Change language to Turkish" onClick={() => changeLanguage("tr")} >TR</button>
                </div >

                <SideMenu />
            </div >

        </header >
    );
};

export default Header;
