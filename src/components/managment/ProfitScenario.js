import React from "react";
import { motion } from "framer-motion";

const ProfitScenario = ({ content }) => {
    const items = content.profitScenarios;

    return (
        <section className="bg-white py-24 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-bvs-darkGreen mb-8"
                >
                    {content.profitScenarioTitle}
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-bvs-lightGreen p-6 rounded-xl shadow"
                        >
                            <h4 className="text-xl font-semibold text-bvs-darkGreen mb-2">{item.title}</h4>
                            <p className="text-bvs-midGreen text-base">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: items.length * 0.1 }}
                    viewport={{ once: true }}
                    className="text-sm text-gray-600 max-w-3xl mx-auto italic"
                >
                    {content.profitNote[0]}<br></br> {content.profitNote[1]}
                </motion.p>
            </div>
        </section>
    );
};

export default ProfitScenario;
