import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CallForm from "../CallForm";
const VineyardServices = () => {
    const { t } = useTranslation();
    const services = t("vineyard.services", { returnObjects: true });

    return (
        <section className="max-w-7xl mx-auto py-16 px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-bvs-deepGreen mb-4">
                    {t("vineyard.title")}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    {t("vineyard.subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(services).map(([key, item], index) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group border border-gray-100"
                    >
                        <div className="mb-4 w-12 h-12 bg-bvs-lightGreen rounded-full flex items-center justify-center text-bvs-deepGreen font-bold text-xl">
                            {key.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="font-semibold text-lg text-bvs-darkGreen group-hover:text-bvs-accentGold">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-3">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 flex items-center">
                <CallForm className="mx-auto" btn_name={t("vineyard.button")} form_title={t("form.title")} />
            </div>
        </section>
    );
};

export default VineyardServices;
