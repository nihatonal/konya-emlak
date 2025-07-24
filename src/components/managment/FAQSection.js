import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = ({ content }) => {
    const faqList = content.faq;
    const [openIndexes, setOpenIndexes] = useState([]);

    const toggle = (index) => {
        if (openIndexes.includes(index)) {
            // Açık olanı kapat
            setOpenIndexes(openIndexes.filter(i => i !== index));
        } else {
            // Yeni açılanı ekle
            setOpenIndexes([...openIndexes, index]);
        }
    };

    return (
        <section className="bg-bvs-softGreen py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-bvs-darkGreen mb-12">
                    {content.faqTitle}
                </h2>

                <div className="space-y-4">
                    {faqList.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow p-4"
                        >
                            <button
                                className="w-full text-left font-semibold text-lg text-bvs-darkGreen"
                                onClick={() => toggle(index)}
                            >
                                {item.question}
                            </button>
                            <AnimatePresence>
                                {openIndexes.includes(index) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 text-bvs-midGreen overflow-hidden"
                                    >
                                        {item.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
