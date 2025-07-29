// src/pages/admin/ResetPasswordVerifyPage.jsx
import React, { useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const ResetPasswordVerifyPage = () => {
    const { sendRequest, error, isLoading } = useHttpClient();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/admin/verify-reset-code",
                "POST",
                JSON.stringify({ email, code }),
                { "Content-Type": "application/json" }
            );
            setIsVerified(true);


        } catch (err) { }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const newPassword = e.target.newPassword.value;
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/admin/reset-password",
                "POST",
                JSON.stringify({ email, code, newPassword }),
                { "Content-Type": "application/json" }
            );
            navigate("/admin/login");
        } catch (err) { }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-center">Şifre Sıfırlama</h2>
                {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
                {!isVerified ? (
                    <form onSubmit={handleVerifyCode} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full mt-1 px-4 py-2 border rounded-xl outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Doğrulama Kodu</label>
                            <input
                                type="text"
                                className="w-full mt-1 px-4 py-2 border rounded-xl outline-none"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                        >
                            {isLoading ? <PulseLoader size={10} color={"#fff"} /> : " Kodu Doğrula"}

                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Yeni Şifre</label>
                            <input
                                type="password"
                                name="newPassword"
                                className="w-full mt-1 px-4 py-2 border rounded-xl outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
                        >
                            Şifreyi Güncelle
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordVerifyPage;
