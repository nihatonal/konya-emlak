import React from 'react'
import { useTranslation } from 'react-i18next';
import AdvantagesSection from '../../components/homePage/AdvantagesSection';
import VineyardBanner from '../../components/homePage/VineyardBanner ';
import VineyardServices from '../../components/homePage/VineyardServices ';
import TestimonialsSection from '../../components/homePage/TestimonialsSection';
import LatestBlogs from '../../components/homePage/LatestBlogs';
import Hero from '../../components/homePage/Hero';
import usePageMeta from '../../hooks/usePageMeta';

const Home = () => {
    const { t, } = useTranslation();
    usePageMeta(
        t('meta.home.title'),
        t('meta.home.description')
    );
    return (
        <div>
            <Hero />
            <AdvantagesSection />
            <VineyardBanner />
            <VineyardServices />
            <TestimonialsSection />
            <LatestBlogs />
        </div >
    )
}

export default Home