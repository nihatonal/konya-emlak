import React, { useState } from "react";
import { motion } from "framer-motion";
import { VALIDATOR_REQUIRE, VALIDATOR_PHONE } from "../../util/validators";
import { useTranslation } from "react-i18next";
import hero from '../../assets/images/hero-uzum-bagi-ve-uzum-taneleri.webp'
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";
import CallForm from "../CallForm";
import Button from "../ui/Button";
import Socials from "../Socials";
import Modal from "../ui/Modal";
import { useLocation } from "react-router-dom";
function Hero() {
    const location = useLocation();
    const [modal, showModal] = useState(false);
    const { isLoading, sendRequest } = useHttpClient();
    const [success, setSuccess] = useState(false);
    const [formState, inputHandler] = useForm(
        {
            name: { value: "", isValid: false },
            phone: { value: "", isValid: false },
        },
        false
    );
    const { t } = useTranslation();

    const sendHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/sendmail`,
                "POST",
                JSON.stringify({
                    name: formState.inputs.name.value,
                    email: '',
                    phone: formState.inputs.phone.value,
                    message: t("hero.orderCallMessage")
                }),
                { "Content-Type": "application/json" }
            );
            setSuccess(true);

            setTimeout(() => {
                showModal(false);
                setSuccess(false);
            }, 3000);
        } catch (err) { }
    };
    const lng = location.pathname.split("/")[1];
    const url = { tr: "/neden-bag-yatirimi", en: "/why-vineyard-investment" }

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-black px-8 py-24">
            <img
                // src={"https://i.imgur.com/JeQl9s5.webp"}
                src={hero}
                alt={t("hero.imageAlt")}
                className="absolute top-0 left-0 w-full h-full object-cover z-1"
                loading="eager"
                width="1920"
                height="1080"
            />
            <div className="absolute inset-0 bg-black/40 z-1" />

            <div className="relative z-1 flex flex-col md:flex-row items-start md:justify-evenly w-full min-h-screen text-white pt-10 md:pt-40">
                <div className="flex flex-col items-start max-w-6xl">
                    <h1 className="text-4xl md:text-6xl font-bold font-serif text-white drop-shadow-md">
                        {t("hero.title")}
                    </h1>
                    <p className="mt-8 font-serif text-xl text-white drop-shadow-sm">
                        {t("hero.subtitle")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CallForm btn_name={t("hero.getSupport")} form_title={t("hero.callFormTitle")}
                                btnClassName=" font-bold cursor-pointer text-bvs-lightGreen 
                             shadow-md bg-bvs-darkGreen hover:bg-bvs-midGreen 
                            hover:text-white transition-all duration-300 text-center"
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button ariaLabel={"go-to-bag-yatirimi"} type="link" to={`/${lng}${url[lng]}`} label={t("hero.moreInfo")} class onClick={() => showModal(true)}
                                btnClassName="font-bold cursor-pointer text-bvs-lightGreen
                                  shadow-md bg-bvs-darkGreen hover:bg-bvs-midGreen
                                hover:text-white transition-all duration-300 text-center"
                            />
                        </motion.div>
                    </div>
                    <Socials className={"absolute z-1 bottom-[30%] md:top-[60%] right-2 md:flex-col gap-6"} />

                </div>

                <Modal
                    onClose={() => showModal(false)}
                    show={modal}
                    onCancel={() => showModal(false)}
                >
                    <CallForm
                        validators_name={[VALIDATOR_REQUIRE()]}
                        validators_phone={[VALIDATOR_REQUIRE(), VALIDATOR_PHONE()]}
                        isLoading={isLoading}
                        isValid={formState.isValid}
                        inputHandler={inputHandler}
                        form_title={t("hero.callFormTitle")}
                        sendHandler={sendHandler}
                        success={success}
                    />
                </Modal>
            </div>

        </section>
    );
}

export default Hero;
