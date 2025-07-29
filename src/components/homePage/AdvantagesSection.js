import { useTranslation } from 'react-i18next';
import { FaLeaf, FaCoins, FaClock, FaChartLine } from 'react-icons/fa';

import { motion } from "framer-motion";
import Container from '../layout/Container';


const AdvantagesSection = () => {
    const { t } = useTranslation();

    return (
        <Container className={"pt-16 md:pt-32 pb-16"}>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-bvs-deepGreen mb-4">
                    {t("advantage.title")}
                </h2>
                <p className="text-bvs-darkGreen max-w-xl mx-auto mb-12">
                    {t("advantage.subtitle")}
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {[0, 1, 2, 3].map((index) => {
                        const advantageKeys = [
                            {
                                icon: <FaCoins className="text-bvs-accentGold text-3xl mb-4" />,
                                title: t("advantage.passiveIncome.title"),
                                description: t("advantage.passiveIncome.description")
                            },
                            {
                                icon: <FaClock className="text-bvs-accentGold text-3xl mb-4" />,
                                title: t("advantage.quickAmortization.title"),
                                description: t("advantage.quickAmortization.description")
                            },
                            {
                                icon: <FaChartLine className="text-bvs-accentGold text-3xl mb-4" />,
                                title: t("advantage.longTermValue.title"),
                                description: t("advantage.longTermValue.description")
                            },
                            {
                                icon: <FaLeaf className="text-bvs-accentGold text-3xl mb-4" />,
                                title: t("advantage.sustainableInvestment.title"),
                                description: t("advantage.sustainableInvestment.description")
                            }
                        ];

                        const item = advantageKeys[index];

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={index}
                                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl group"
                            >
                                {item.icon}
                                <h3 className="font-semibold text-xl text-bvs-darkGreen group-hover:text-bvs-accentGold">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-3">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

export default AdvantagesSection;
