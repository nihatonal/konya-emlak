import { motion } from 'framer-motion'

import intro from '../../assets/images/Leonardo_Lightning_XL_A_rustic_wicker_basket_filled_with_fresh_3.webp'

const VineyardModelIntro = ({ content }) => {

    return (
        <section className="relative z-10 py-24 bg-[#F5F5F1] overflow-hidden">
            <div className="max-w-7xl container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#1C2B1F] mb-6">
                            {content.whatIsModelTitle}
                        </h2>
                        <p className="text-lg leading-relaxed text-[#48684D]">
                            {content.whatIsModelText}
                        </p>
                    </motion.div>

                    {/* Image or Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <img
                            src={intro}
                            alt="Vineyard Model"
                            width={600}
                            height={400}
                            className="rounded-xl shadow-xl"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default VineyardModelIntro
