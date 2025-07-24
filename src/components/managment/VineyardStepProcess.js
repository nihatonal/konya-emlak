import { motion } from 'framer-motion'


const steps = ['landSelection', 'soilPreparation', 'planting', 'irrigation', 'harvest']

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.3
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const VineyardStepProcess = ({ content }) => {

    return (
        <section className="bg-[#FAFAF6] py-24">
            <div className="container max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B1F] mb-12">
                    {content.stepByStepTitle}
                </h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {steps.map((key, index) => (
                        <motion.div
                            key={key}
                            variants={cardVariants}
                            className="bg-white rounded-xl shadow-lg p-6 text-left relative overflow-hidden group"
                        >
                            {/* Number Bubble */}
                            <div className="absolute -top-1 -left-1 w-10 h-10 bg-[#48684D] text-white text-xl font-bold flex items-center justify-center rounded-br-xl shadow-md group-hover:bg-bvs-accentGold transition-transform duration-300">
                                {index + 1}
                            </div>

                            <h3 className="text-xl font-semibold text-[#1C2B1F] mb-2 mt-4">
                                {content[`${key}Title`]}
                            </h3>
                            <p className="text-[#4C5F4D] leading-relaxed text-sm">
                                {content[`${key}Text`]}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default VineyardStepProcess
