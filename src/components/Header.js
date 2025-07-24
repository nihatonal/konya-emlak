import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import { useTranslation } from 'react-i18next';
import SideMenu from './SideMenu';
import CallForm from './CallForm';
import Logo from './Logo';

const slugMapping = {
    tr: {
        "about-us": "/hakkimizda",
        "contact": "/iletisim",
        "privacy-policy": "/gizlilik",
        "blog": "/blog",
        "vineyards": "/baglarimiz",
        "why-vineyard-investment": "/neden-bag-yatirimi",
        "buying-process": "/bag-alim-sureci",
        "vineyard-management": "/bag-isletme"
    },
    en: {
        "hakkimizda": "/about-us",
        "iletisim": "/contact",
        "gizlilik": "/privacy-policy",
        "blog": "/blog",
        "baglarimiz": "/vineyards",
        "neden-bag-yatirimi": "/why-vineyard-investment",
        "bag-alim-sureci": "/buying-process",
        "bag-isletme": "/vineyard-management"
    }
};

const blogSlugMapping = {
    tr: {
        "vineyard-investment": "/bag-yatirimi",
        "konya-bozkir-hamzalar": "konya-bozkir-hamzalar",
        "vineyard-investment-in-konya": "/konyada-bag-yatirimi",
        "vineyard-investment-trends": "/bag-yatirimi-trendleri"
    },
    en: {
        "bag-yatirimi": "/vineyard-investment",
        "konya-bozkir-hamzalar": "/konya-bozkir-hamzalar",
        "konyada-bag-yatirimi": "/vineyard-investment-in-konya",
        "bag-yatirimi-trendleri": "/vineyard-investment-trends"
    }

};

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const supportedLangs = ['tr', 'en'];
    const lng = supportedLangs.includes(location.pathname.split("/")[1])
        ? location.pathname.split("/")[1]
        : 'tr'; // default dil

    const [scrolled, setScrolled] = useState(false);

    const isContactPage = /^\/(tr|en)?\/?(iletisim|contact)\/?$/.test(location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = async (newLng) => {
        if (newLng === lng) return;

        let pathWithoutLng = location.pathname.replace(/^\/(tr|en)/, "");
        if (pathWithoutLng === "") pathWithoutLng = "/";

        const currentSlug = pathWithoutLng.replace(/^\/+/, "").split("/")[0];

        const isBlogPage = pathWithoutLng.startsWith("/blog/") || pathWithoutLng.startsWith("blog/");

        let newSlug = pathWithoutLng;

        if (isBlogPage) {
            const blogSlug = pathWithoutLng.split("/")[2];
            const mapped = blogSlugMapping[newLng][blogSlug];
            if (mapped) {
                newSlug = `/blog${mapped}`;
            }
        } else {
            const newLangSlugs = slugMapping[newLng];
            newSlug = newLangSlugs[currentSlug] || pathWithoutLng;
        }

        const newPath = `/${newLng}${newSlug.startsWith("/") ? "" : "/"}${newSlug}`;

        await i18n.changeLanguage(newLng);
        navigate(newPath);
    };

    const headerClass = isContactPage || scrolled
        ? 'bg-bvs-deepGreen/60 backdrop-blur-md shadow-md'
        : 'bg-transparent';

    return (
        <header className={`fixed top-0 z-[60] w-full flex items-center justify-between px-6 py-3 transition-all duration-300 ${headerClass}`}>
            <Logo />

            <NavLinks className={`hidden md:flex`} classDropNav="text-bvs-lightGreen" />

            <div className='flex items-center justify-center gap-4'>
                <CallForm classButtonWrapper={"hidden md:flex"} btnClassName="text-white" btn_name={t("header.cta")} form_title={t("form.callFromTitle")} />

                <div className="flex gap-1 mr-4 md:mr-0">
                    <button aria-label="Change language to English" className={`font-semibold hover:text-bvs-lightGreen ${i18n.language === "en" ? "text-bvs-accentGold" : "text-gray-300"}`} onClick={() => changeLanguage("en")}>EN</button>
                    <button aria-label="Change language to Turkish" className={`font-semibold hover:text-bvs-lightGreen ${i18n.language === "tr" ? "text-bvs-accentGold" : "text-gray-300"}`} onClick={() => changeLanguage("tr")}>TR</button>
                </div>

                <SideMenu />
            </div>
        </header>
    );
};

export default Header;
