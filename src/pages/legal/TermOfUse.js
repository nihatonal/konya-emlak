
import { useTranslation } from "react-i18next";
import usePageMeta from "../../hooks/usePageMeta";

export default function TermsOfUse() {
    const { t } = useTranslation();
    usePageMeta(
        t('meta.termsofuse.title'),
        t('meta.termsofuse.description')
    );
    return (
        <section className="max-w-4xl mx-auto px-4 py-20 text-gray-800">
            <h1 className="text-3xl text-bvs-accentGold font-bold mb-6">{t("terms.title")}</h1>

            <p className="mb-6">{t("terms.intro")}</p>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{t("terms.useOfSite.title")}</h2>
                <p>{t("terms.useOfSite.text")}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{t("terms.intellectualProperty.title")}</h2>
                <p>{t("terms.intellectualProperty.text")}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{t("terms.thirdPartyLinks.title")}</h2>
                <p>{t("terms.thirdPartyLinks.text")}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{t("terms.limitationOfLiability.title")}</h2>
                <p>{t("terms.limitationOfLiability.text")}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{t("terms.changes.title")}</h2>
                <p>{t("terms.changes.text")}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">{t("terms.contact.title")}</h2>
                <p>{t("terms.contact.text")}</p>
            </div>
        </section>
    );
}
