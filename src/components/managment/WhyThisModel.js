
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const listItemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
    })
}

const WhyThisModel = () => {
    const t = useTranslation('vineyardManagementModel')
    const benefits = [
        'sustainableIncome',
        'diversifiedRevenue',
        'landValueAppreciation',
        'natureConnected',
        'professionalManagement'
    ]

    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* Görsel alanı */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    <img
                        src="/images/why-model.jpg"
                        alt="Bağ İşletme Modeli"
                        className="w-full rounded-2xl shadow-lg"
                    />
                </motion.div>

                {/* Metin alanı */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B1F] mb-8">
                        {t('whyThisModelTitle')}
                    </h2>

                    <ul>
                        {benefits.map((key, i) => (
                            <motion.li
                                key={key}
                                custom={i}
                                variants={listItemVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="flex items-start gap-4 mb-5"
                            >
                                <CheckCircle className="text-[#48684D] w-6 h-6 mt-1 flex-shrink-0" />
                                <p className="text-[#4C5F4D] leading-relaxed text-base">
                                    {t(`why.${key}`)}
                                </p>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default WhyThisModel
