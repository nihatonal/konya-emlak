import React from "react";
import { useTranslation } from "react-i18next";
import usePageMeta from "../../hooks/usePageMeta";


const PrivacyPolicy = () => {
    const { t } = useTranslation();
    usePageMeta(
        t('meta.privacy.title'),
        t('meta.privacy.description')
    );
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 space-y-8">
            <h1 className="text-3xl font-bold text-bvs-accentGold">{t("privacyPolicy.title")}</h1>
            <p>{t("privacyPolicy.intro")}</p>

            <section>
                <h2 className="text-xl font-semibold mb-2">{t("privacyPolicy.collectedDataTitle")}</h2>
                <p>{t("privacyPolicy.collectedData")}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">{t("privacyPolicy.usageTitle")}</h2>
                <p>{t("privacyPolicy.usage")}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">{t("privacyPolicy.thirdPartiesTitle")}</h2>
                <p>{t("privacyPolicy.thirdParties")}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">{t("privacyPolicy.securityTitle")}</h2>
                <p>{t("privacyPolicy.security")}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">{t("privacyPolicy.cookiesTitle")}</h2>
                <p>{t("privacyPolicy.cookies")}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">{t("privacyPolicy.rightsTitle")}</h2>
                <p>{t("privacyPolicy.rights")}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">{t("privacyPolicy.contactTitle")}</h2>
                <p>{t("privacyPolicy.contact")}</p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
