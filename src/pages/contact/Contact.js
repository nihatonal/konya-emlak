import { t } from 'i18next';
import React, { useState } from 'react';
import Socials from '../../components/Socials'
import usePageMeta from '../../hooks/usePageMeta';
import hero from '../../assets/images/blog/tabakta-kuru-uzum.jpg'
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // API POST isteği ekleyebilirsin
    };
    usePageMeta(
        t('meta.contact.title'),
        t('meta.contact.description')
    );

    return (
        <div className="bg-bvs-lightGreen min-h-screen py-20 px-6 text-bvs-deepGreen">
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold mb-4">{t("contact.title")}</h1>
                <p className="text-bvs-midGreen font-medium">
                    {t("contact.subtitle")}
                </p>
            </section>

            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto grid md:grid-cols-2 overflow-hidden">

                {/* Left - Contact Info */}
                <div className="bg-bvs-softGreen px-8 py-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4">{t("contact.contactInfoTitle")}</h2>
                    <p className="mb-4">{t("contact.address")}: Konya, Bozkır, Hamzalar</p>
                    <a href="tel:+905079870088" className="mb-4 hover:text-bvs-darkGreen transition">{t("contact.phone")}: +90 (507) 987 00 88</a>
                    <a href="mailto:info@bagyatirimi.com" className="mb-4 hover:text-bvs-darkGreen transition">{t("contact.email")}: info@bagyatirimi.com</a>
                    <div className="flex space-x-4 mt-6">
                        <Socials className={"gap-4"}
                            classIcon="text-bvs-darkGreen border-bvs-darkGreen hover:bg-bvs-midGreen
                            hover:border-bvs-midGreen hover:text-bvs-softGreen
                            " />
                    </div>
                </div>

                {/* Right - Contact Form */}
                <form onSubmit={handleSubmit} className="px-8 py-12 bg-white">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">{t("contact.nameLabel")}</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-bvs-darkGreen"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">{t("contact.email")}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-bvs-darkGreen"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">{t("contact.message")}</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-bvs-darkGreen"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-bvs-darkGreen text-white font-semibold py-3 rounded-lg hover:bg-bvs-accentGold transition"
                    >
                        {t("contact.submitButton")}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Contact;
