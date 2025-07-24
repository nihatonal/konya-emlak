import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";

const CTASection = ({ content }) => {
    const location = useLocation();
    const lng = location.pathname.split("/")[1];
    const url = { tr: "/iletisim", en: "/contact" }
    return (
        <section className="bg-bvs-accentGold py-16 px-6 text-center md:rounded-xl max-w-4xl mx-auto my-16 shadow-lg">
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-4"
            >
                {content.ctaText}
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className={"inline-block mt-3"}
            >
                <Button ariaLabel={"go-to-bag-yatirimi"} type="link" to={`/${lng}${url[lng]}`} label={content.ctaButton}
                    btnClassName="font-bold cursor-pointer text-bvs-lightGreen
                                  shadow-md bg-bvs-darkGreen hover:bg-bvs-darkGreen
                                transition-all duration-300 text-center hover:shadow-xl"
                />
            </motion.div>
        </section>
    );
};

export default CTASection;
