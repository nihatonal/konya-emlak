import React from "react";
import { useTranslation } from "react-i18next";

import PageHero from "../../components/layout/PageHero";

import IntroSection from '../../components/managment/IntroSection'
import VineyardModelIntro from '../../components/managment/VineyardModelIntro'
import VineyardStepProcess from "../../components/managment/VineyardStepProcess";

import hero from "../../assets/images/Leonardo_Lightning_XL_A_rustic_wicker_basket_filled_with_fresh_3.webp"
import ProfitScenario from "../../components/managment/ProfitScenario";
import FAQSection from "../../components/managment/FAQSection";
import CTASection from "../../components/managment/CTASection";
import usePageMeta from "../../hooks/usePageMeta";
const VineyardManagement = () => {
    const { t } = useTranslation()
    const content = t('vineyardManagementModel', { returnObjects: true });

    usePageMeta(
        t('meta.management.title'),
        t('meta.management.description')
    );
    return (
        <section className="bg-bvs-lightGreen min-h-screen w-full">
            {/* Hero */}
            <PageHero image={hero} content={content} />
            <IntroSection />
            <VineyardModelIntro content={content} />
            <VineyardStepProcess content={content} />
            <ProfitScenario content={content} />
            <FAQSection content={content} />
            <CTASection content={content} />
        </section>
    );
};

export default VineyardManagement;
