import React from 'react'

const PageHero = ({ image, content }) => {
    return (

        <div className="relative h-[60vh] md:h-[45vh] overflow-hidden">
            <img
                src={image}
                alt="Vineyard"
                className="absolute inset-0 h-full w-full object-cover object-center z-0"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />
            <div className="relative z-20 h-full flex items-center justify-center text-center text-white px-4">
                <div>
                    <h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        {content.title}
                    </h1>
                    <p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-4 text-lg md:text-xl max-w-3xl mx-auto"
                    >
                        {content.subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PageHero
