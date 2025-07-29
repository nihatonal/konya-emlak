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
    const { t, ready } = useTranslation();

    usePageMeta(
        ready ? t('meta.home.title') : '',
        ready ? t('meta.home.description') : ''
    );

    if (!ready) return <div>Yükleniyor...</div>;
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