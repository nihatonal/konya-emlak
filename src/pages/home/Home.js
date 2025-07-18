import React from 'react'
import Hero from '../../components/Hero'
import { Helmet, HelmetProvider } from "react-helmet-async";
import AdvantagesSection from '../../components/homePage/AdvantagesSection';
import VineyardBanner from '../../components/homePage/VineyardBanner ';
import VineyardServices from '../../components/homePage/VineyardServices ';

const Home = () => {
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Bağ Bahçe Yatırım</title>
                    <meta name="description" content={`üzüm bağı ve yatırımı hakkında giriş`} />
                    <link rel="canonical" href={`https://seninsite.com/satilik-uzum-bagi/`} />
                </Helmet>
            </HelmetProvider>
            <Hero />
            <AdvantagesSection />
            <VineyardBanner />
            <VineyardServices/>
        </div>
    )
}

export default Home