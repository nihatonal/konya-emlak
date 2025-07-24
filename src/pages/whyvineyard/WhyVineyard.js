import { useTranslation } from "react-i18next";
import { CheckCircle, Leaf, DollarSign, Globe, ShieldAlert, Phone, Mail } from "lucide-react";
import vineyardImage from "../../assets/images/uzum-hasati-bag-yatirimi.webp";
import vineyard_risk from '../../assets/images/Leonardo_Lightning_XL_A_dramatic_digital_illustration_showing_2.webp'
import usePageMeta from "../../hooks/usePageMeta";
import Container from "../../components/layout/Container";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import PageHero from "../../components/layout/PageHero";

const VineyardInvestment = () => {
    const { t } = useTranslation();

    usePageMeta(
        t('meta.whyvineyard.title'),
        t('meta.whyvineyard.description')
    );
const content =t("vineyardInvestment", { returnObjects: true }) || [];
    const advantages = t("vineyardInvestment.advantages.items", { returnObjects: true }) || [];
    const steps = t("vineyardInvestment.howToStart.steps", { returnObjects: true }) || [];
    const risks = t("vineyardInvestment.risks.items", { returnObjects: true }) || [];

    const defaultIcons = [
        <DollarSign className="text-bvs-midGreen mt-1 shrink-0" />,
        <Leaf className="text-bvs-midGreen mt-1 shrink-0" />,
        <Globe className="text-bvs-midGreen mt-1 shrink-0" />,
        <CheckCircle className="text-bvs-midGreen mt-1 shrink-0" />
    ];

    return (
        <>
            {/* Hero Section */}
            <PageHero image={vineyardImage} content={content} />

            {/* Main Content */}
            <Container className="py-16">
                {/* Advantages */}
                <PageHeader>{t("vineyardInvestment.advantages.title")}</PageHeader>
                <div className="grid md:grid-cols-2 gap-6">
                    {advantages.map((text, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
                            {defaultIcons[idx] || <CheckCircle className="text-bvs-lightGreen mt-1 shrink-0" />}
                            <span className="text-base leading-relaxed">{text}</span>
                        </div>
                    ))}
                </div>

                {/* How to Start */}
                <PageHeader className="mt-20">{t("vineyardInvestment.howToStart.title")}</PageHeader>
                <div className="relative pl-6 border-l-2 border-bvs-lightGreen">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative mb-10">
                            <div className="absolute -left-5 top-1.5 w-4 h-4 bg-bvs-midGreen rounded-full border-2 border-white shadow-md" />
                            <div className="ml-2 text-lg font-medium text-bvs-darkGreen">
                                {step}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Risks */}
                <PageHeader className="mt-20">{t("vineyardInvestment.risks.title")}</PageHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
                    {/* Risk List */}
                    <div className="bg-gradient-to-br from-red-100 via-red-50 to-white border-l-4 border-red-400 px-6 py-4 rounded-xl shadow-inner">
                        <ul className="space-y-3">
                            {risks.map((risk, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <ShieldAlert className="text-red-400 mt-1 shrink-0" />
                                    <span>{risk}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-700 mt-4">{t("vineyardInvestment.risks.conclusion")}</p>
                    </div>

                    {/* Image or Icon */}
                    <div className="hidden md:flex justify-center ">
                        <img
                            src={vineyard_risk}
                            alt="Investment Risks"
                            className="h-[250px] opacity-90 rounded-xl shadow-inner"
                        />
                    </div>
                </div>


                {/* Call to Action */}
                <div className="mt-20 grid md:grid-cols-2 md:w-[500px] mx-auto items-center gap-4">
                    <Button ariaLabel={"call-by-phone"} type="link" to={`tel:+905079870088`} label={<> <Phone className="w-5 h-5" />{t("vineyardInvestment.footer.phone")}</>}
                        btnClassName="w-full inline-flex justify-center items-center gap-2 text-white
                        py-3 bg-bvs-midGreen hover:bg-bvs-darkGreen/90 text-lg transition"
                    />
                    <Button ariaLabel={"send-email"} type="link" to={`mailto:info@bvsyatirim.com`} label={<> <Mail className="w-5 h-5" />{t("vineyardInvestment.footer.email")}</>}
                        btnClassName="w-full inline-flex justify-center items-center gap-2 
                        py-3 border border-bvs-midGreen bg-transparent text-bvs-midGreen hover:bg-bvs-darkGreen/90 hover:text-white text-lg transition"
                    />
                </div>
            </Container>
        </>
    );
};

export default VineyardInvestment;
