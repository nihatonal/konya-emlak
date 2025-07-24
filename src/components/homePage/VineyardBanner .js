import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "../layout/Container";
import vineyardBanner from '../../assets/images/Leonardo_Lightning_XL_A_closeup_shot_of_a_pile_of_dried_black_1.webp'
const VineyardBanner = () => {
    const { t } = useTranslation();

    return (
        <Container className={"py-16"}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-bvs-softGreen rounded-xl shadow-lg  p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">

                {/* Sol Kısım: Metinler */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-bvs-deepGreen leading-tight mb-4">
                        {t("vineyardBanner.title")}
                    </h2>
                    <div className="space-y-3 mb-8 text-bvs-darkGreen text-lg font-medium">
                        <p>{t("vineyardBanner.area")}</p>
                        <p>{t("vineyardBanner.price")}</p>
                        <p>{t("vineyardBanner.income")}</p>
                    </div>
                    <motion.a
                        href="#yatirim"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-bvs-accentGold text-white font-semibold rounded-full px-8 py-3 shadow-md hover:shadow-lg transition"
                        aria-label="Explore Investment Process"
                    >
                        {t("vineyardBanner.cta")}
                    </motion.a>
                </div>

                {/* Sağ Kısım: Görsel / İkon (İstersen değiştirilebilir) */}
                <div className="flex-1 flex justify-center md:justify-end">
                    <img
                        src={vineyardBanner}
                        alt="Vineyard"
                        className="rounded-lg shadow-lg max-w-full h-auto object-cover"
                        loading="lazy"
                    />
                </div>
            </motion.div>
        </Container>
    );
};

export default VineyardBanner;
