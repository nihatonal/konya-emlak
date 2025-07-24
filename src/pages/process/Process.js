import { useTranslation } from "react-i18next";
import vineyardImage from "../../assets/images/Leonardo_Lightning_XL_A_realistic_closeup_shot_of_ripe_grapes_2.webp";
import PageHero from "../../components/layout/PageHero";
import usePageMeta from "../../hooks/usePageMeta";
import ZigzagTimeline from "../../components/ZigzagTimeline";
import { NavLink, useLocation } from "react-router-dom";
export default function Process() {
    const { t } = useTranslation();
    const location = useLocation();
    const lng = location.pathname.split("/")[1]; // tr, en, vs.
    const content = t("guide.steps", { returnObjects: true });
    const hero = t("guide", { returnObjects: true });
    const steps = [
        "step1",
        "step2",
        "step3",
        "step4",
        "step5",
        "step6",
        "step7",
    ];

    usePageMeta(t("meta.process.title"), t("meta.process.description"));


    return (
        <div className="bg-white text-gray-800">
            {/* Hero */}
            <PageHero image={vineyardImage} content={hero} />

            {/* Steps Section */}
            <ZigzagTimeline steps={steps} content={content} />

            {/* CTA */}
            <div className="bg-green-50 py-12 px-4 text-center">
                <h3 className="text-2xl font-bold text-green-800">
                    {t("guide.cta.title")}
                </h3>
                <p className="text-gray-700 mt-2 mb-6">
                    {t("guide.cta.description")}
                </p>
                <NavLink
                    to={`/${lng}/iletisim`}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition"
                >
                    {t("guide.cta.contactLink")}
                </NavLink>
            </div>
        </div>
    );
}
