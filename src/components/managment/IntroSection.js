import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import intro from '../../assets/images/Leonardo_Lightning_XL_A_professional_and_inspiring_wideangle_p_0.webp'
const IntroSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto container px-4 flex flex-col-reverse md:flex-row items-center gap-10">
                {/* Left Image */}
                <motion.div
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img
                        src={intro}
                        alt="Bağ sahası"
                        className="rounded-2xl shadow-xl"
                    />
                </motion.div>

                {/* Right Text */}
                <motion.div
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        Lidya Emlak Olarak Ne Yapıyoruz?
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        22 yıllık tarım ve gayrimenkul tecrübemizle yatırımcılarımıza,
                        sadece arazi değil; güvenilir bir ortaklık ve sürdürülebilir bir
                        bağ işletmesi sunuyoruz. Tüm süreçleri şeffaf ve profesyonel bir
                        ekiple yönetiyoruz.
                    </p>

                    <div className="flex items-center gap-3 text-green-700 font-medium text-md">
                        <FaCheckCircle className="text-green-600" />
                        300+ başarılı yatırım süreci
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default IntroSection;
