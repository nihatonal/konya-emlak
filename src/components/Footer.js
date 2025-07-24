import React from 'react';
import { useLocation } from "react-router-dom";
import Socials from './Socials';
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Logo from './Logo';
const Footer = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const lng = location.pathname.split("/")[1]; // tr, en, vs.

    return (
        <footer className="bg-bvs-dropBack text-bvs-lightGreen px-6 py-14">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Sol Kısım */}
                <div className='flex flex-col space-y-2'>
                    <Logo className="justify-start" />
                    <p className="text-sm text-bvs-softGreen pb-4">
                        {t("footer.description")}
                    </p>
                    <a href="tel:+905079870088" className='flex items-center gap-2 hover:text-bvs-accentGold transition'><FaPhone />{t('footer.contact.phone')}</a>
                    <a href="mailto:info@bagyatirimi.com" className='flex items-center gap-2 hover:text-bvs-accentGold transition'><FaEnvelope /> {t('footer.contact.email')}</a>
                    <Socials className={"gap-2 pt-4"} classIcon="w-9 h-9 p-1 border-none hover:text-bvs-accentGold hover:bg-transparent" />
                </div>

                {/* Orta Kısım */}
                <div className="flex flex-col gap-2">
                    <p className="text-bvs-green font-semibold mb-4">{t("footer.quickMenu")}</p>
                    {/* <a href={`/${lng}/hakkimizda`} className="hover:text-bvs-accentGold text-sm transition">{t("nav.about")}</a>
                    <a href={`/${lng}/iletisim`} className="hover:text-bvs-accentGold text-sm transition">{t("footer.contact_")}</a> */}
                    <a href={`/${lng}/bag-alim-sureci`} className="hover:text-bvs-accentGold text-sm transition">{t("nav.buyingProcess")}</a>
                    <a href={`/${lng}/bag-isletme`} className="hover:text-bvs-accentGold text-sm transition">{t("nav.managementModel")}</a>
                    <a href={`/${lng}/faq`} className="hover:text-bvs-accentGold text-sm transition">{t("footer.faq")}</a>
                    <a href={`/${lng}/privacy-policy`} className="hover:text-bvs-accentGold text-sm transition">{t("footer.privacyPolicy")}</a>
                    <a href={`/${lng}/cookies`} className="hover:text-bvs-accentGold text-sm transition">{t("footer.cookies")}</a>
                    <a href={`/${lng}/terms-of-service`} className="hover:text-bvs-accentGold text-sm transition">{t("footer.termsOfUse")}</a>
                </div>

                {/* Sağ Kısım */}
                <div>
                    <p className="text-bvs-green font-semibold mb-4">{t("footer.followUs")}</p>
                    <p className="text-sm text-bvs-softGreen mb-4">
                        {t("footer.newsletter_desc")}
                    </p>
                    <form className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="email"
                            placeholder={t("form.emailPlaceholder")}
                            className="w-full sm:w-auto flex-1 px-3 py-2 rounded-lg bg-bvs-deepGreen text-white placeholder:text-bvs-green text-sm focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-bvs-darkGreen hover:bg-bvs-midGreen text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                            {t("footer.newsletter_join")}
                        </button>
                    </form>
                </div>

            </div>

            <div className="mt-10 border-t border-bvs-deepGreen pt-6 text-center text-xs text-bvs-softGreen">
                © {new Date().getFullYear()} {t("footer.copyright")}
            </div>
        </footer >
    );
};

export default Footer;
