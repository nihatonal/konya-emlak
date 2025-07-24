import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

const ZigzagTimeline = ({ steps, content }) => {
    return (
        <ParallaxProvider>
            <div className="relative max-w-6xl mx-auto px-4 py-20">
                {/* Dikey çizgi: sadece md ve üstü */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-300 -translate-x-1/2 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 px-4 md:px-0 relative z-10">
                    {steps.map((key, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <Parallax
                                key={key}
                                speed={isLeft ? -5 : 5}
                                className={`
                  relative flex flex-col
                  ${isLeft ? "md:col-start-1 items-end text-right pr-6" : "md:col-start-2 items-start text-left pl-6"}
                  ${!isLeft ? "mt-24 md:mt-44" : "mt-0"}
                `}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="w-full"
                                >
                                    {/* Numara baloncuk */}
                                    <div
                                        className={`absolute top-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shadow-md z-10
                      ${isLeft ? "-right-5" : "-left-5"}
                      md:static md:mb-4
                      md:flex md:justify-center md:items-center
                    `}
                                    >
                                        {index + 1}
                                    </div>

                                    {/* Kart */}
                                    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 w-full">
                                        <h3 className="text-lg md:text-xl font-semibold mb-2">{content[key].title}</h3>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                            {content[key].desc.map((d, i) => (
                                                <li key={i}>{d}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </Parallax>
                        );
                    })}
                </div>
            </div>
        </ParallaxProvider>
    );
};

export default ZigzagTimeline;
