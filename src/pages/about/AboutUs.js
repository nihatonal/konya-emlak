import React from 'react';
import { useTranslation } from 'react-i18next';
import about from '../../assets/images/aboutus/firma-tarihi-company-history.png';
import mission from "../../assets/images/aboutus/partnership-ortaklik-el-sikisma.png";
import hero from "../../assets/images/Leonardo_Lightning_XL_A_symbolic_and_inspiring_scene_of_a_vine_2.webp"
import Container from '../../components/layout/Container';
import usePageMeta from '../../hooks/usePageMeta';
import PageHero from '../../components/layout/PageHero';
import Button from '../../components/ui/Button'
import { useLocation } from 'react-router-dom';
const AboutUs = () => {
    const location = useLocation();
    const lng = location.pathname.split("/")[1]; // tr, en, vs.
    const { t, } = useTranslation();
    const content = t("aboutUs", { returnObjects: true });

    usePageMeta(
        t('meta.about.title'),
        t('meta.about.description')
    );

    return (

        <div className="bg-bvs-lightGreen text-bvs-deepGreen">

            {/* Hero Section */}
            <PageHero image={hero} content={content} />


            {/* History Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-bvs-soilBrown">{content.historyTitle}</h2>
                    <p className="mt-4 text-bvs-deepGreen">{content.historySubtitle}</p>
                    <p className="mt-4 text-bvs-deepGreen">{content.historySubtitle_2}</p>
                </div>
                <div>
                    <img
                        src={about}
                        alt="Vineyard"
                        className="rounded-2xl shadow-xl"
                    />
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <p className="text-4xl font-extrabold text-bvs-accentGold">17+</p>
                        <p className="text-bvs-deepGreen font-medium">{content.experinceYear}</p>
                    </div>
                    <div>
                        <p className="text-4xl font-extrabold text-bvs-accentGold">1000+</p>
                        <p className="text-bvs-deepGreen font-medium">{content.happyCustomer}</p>
                    </div>
                    <div>
                        <p className="text-4xl font-extrabold text-bvs-accentGold">50+</p>
                        <p className="text-bvs-deepGreen font-medium">{content.vineyardArea}</p>
                    </div>
                    <div>
                        <p className="text-4xl font-extrabold text-bvs-accentGold">%100</p>
                        <p className="text-bvs-deepGreen font-medium">{content.happinessCustomer}</p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
                <div className="bg-bvs-lightGreen border border-bvs-green rounded-2xl p-8 shadow-md">
                    <h3 className="text-2xl font-bold text-bvs-soilBrown">{content.mission}</h3>
                    <p className="mt-4 text-bvs-deepGreen">{content.missionSubtitle}</p>
                </div>
                <div className="bg-bvs-lightGreen border border-bvs-green rounded-2xl p-8 shadow-md">
                    <h3 className="text-2xl font-bold text-bvs-soilBrown">{content.vision}</h3>
                    <p className="mt-4 text-bvs-deepGreen">{content.visionSubtitle}</p>
                </div>
            </section>

            {/* Partnership */}
            <section className="bg-bvs-midGreen py-20 px-6 text-center text-white">
                <Container className="py-0">
                    <h2 className="text-3xl font-bold">{content.partnershipTitle}</h2>
                    <p className="mt-4 max-w-3xl mx-auto">{content.partnershipSubtitle}</p>
                    <img
                        src={mission}
                        alt="Partnership"
                        className=" h-96 w-full object-cover mx-auto mt-10 rounded-xl shadow-xl"
                    />
                </Container>
            </section>

            {/* Call to Action */}
            <section className=" flex flex-col items-center bg-bvs-darkGreen py-20 px-6 text-center text-white">
                <h2 className="text-3xl font-bold text-bvs-accentGold">{content.ctaTitle}</h2>
                <p className="mt-4 text-bvs-softGreen max-w-3xl mx-auto">{content.ctaSubtitle}</p>
                <Button ariaLabel={"go-to-bag-yatirimi"} type="link" to={`/${lng}/iletisim`} label={content.ctaBtn}
                    classButtonWrapper="mt-8"
                    btnClassName="font-bold cursor-pointer text-bvs-lightGreen
                shadow-md bg-bvs-accentGold hover:bg-bvs-soilBrown
                hover:text-white transition-all duration-300 text-center"
                />
            </section>

        </div>
    );
};

export default AboutUs;
