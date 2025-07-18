import React, { useState } from 'react';

import PropagateLoader from "react-spinners/PropagateLoader";
import { NavLink } from 'react-router-dom';
import Input from './ui/Input';
import { useTranslation } from 'react-i18next';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { useHttpClient } from "../hooks/http-hook";
import { useForm } from "../hooks/form-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_PHONE } from "../util/validators";
// import Success from './Success';

function CallForm({
    className, form_title, btn_name, btnClassName, classButtonWrapper
}) {
    const { t, i18n } = useTranslation();
    const [modal, showModal] = useState(false);
    const [success, setSuccess] = useState(false);

    const { isLoading, sendRequest } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            name: { value: "", isValid: false },
            phone: { value: "", isValid: false },
        },
        false
    );

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
                    message: `${formState.inputs.name.value} adlı müşteri aramanızı bekliyor.`
                }),
                { "Content-Type": "application/json" }
            );
            setSuccess(true)
            setTimeout(() => {
                showModal(false)
                setSuccess(false)
            }, 3000);
        } catch (err) { }
    };

    return (
        <div className={className}>
            <Button type="button" ariaLabel="form-modal-btn" btnClassName={btnClassName} classButtonWrapper={classButtonWrapper} label={btn_name} onClick={() => showModal(true)} />
            <Modal onClose={() => showModal(false)} show={modal} onCancel={() => showModal(false)}>
                {!success ? (
                    <>
                        <h2 className="text-xl text-bvs-darkGreen font-bold mb-10">
                            {form_title}
                        </h2>

                        <form
                            id="CallForm"
                            name="CallForm"
                            method="post"
                            onSubmit={sendHandler}
                            className="flex flex-col gap-4 mb-15"
                        >
                            <Input
                                className="call_form_input"
                                id="name"
                                element="input"
                                type="name"
                                placeholder={t("form.namePlaceholder")}
                                validators={[VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                                label={t("form.nameLabel")}
                            />
                            <Input
                                className="call_form_input"
                                id="phone"
                                element="input"
                                type="text"
                                placeholder={t("form.phonePlaceholder")}
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_PHONE()]}
                                onInput={inputHandler}
                                label={t("form.phoneLabel")}
                            />

                            <div
                                className={`w-full mt-4 ${formState.isValid
                                    ? ""
                                    : "pointer-events-none opacity-60"
                                    }`}
                            >
                                <button
                                    type="submit"
                                    disabled={!formState.isValid}
                                    className={`w-full h-10 rounded-full flex items-center justify-center text-stone-50 font-medium ${formState.isValid
                                        ? "bg-emerald-700 hover:bg-teal-600 transition-all duration-300"
                                        : "bg-gray-400 text-gray-600"
                                        }`}
                                >
                                    {isLoading ? (
                                        <PropagateLoader
                                            color={"white"}
                                            loading={true}
                                            size={4}
                                        />
                                    ) : (
                                        t("form.submit")
                                    )}
                                </button>
                            </div>
                        </form>

                        {i18n.language === "en" && <p className="text-stone-400 text-sm mt-10">
                            {t("form.submit_text")} "{t("form.submit")}" {" "}
                            {t("form.submit_approve")}{" "}
                            <NavLink
                                to="/"
                                className="text-sky-600 underline hover:opacity-80 transition"
                            >
                                {t("form.submit_link")}
                            </NavLink>.
                        </p>}
                        {i18n.language === "tr" && <p className="text-stone-400 text-sm mt-10">
                            "{t("form.submit")}" {" "} {t("form.submit_text")}{" "}
                            <NavLink
                                to="/"
                                className="text-sky-600 underline hover:opacity-80 transition"
                            >
                                {t("form.submit_link")}
                            </NavLink>
                            {t("form.submit_approve")}
                            .
                        </p>}
                    </>
                ) : (
                    <div></div>
                )
                }
            </Modal>
        </div >
    );
}


export default CallForm;