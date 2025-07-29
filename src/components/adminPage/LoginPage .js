import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { PulseLoader } from "react-spinners";
const LoginPage = () => {
    const auth = useContext(AuthContext);
    const { error, isLoading, sendRequest } = useHttpClient();
    const navigate = useNavigate();

    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/admin/login",
                "POST",
                JSON.stringify({ username, password }),
                { "Content-Type": "application/json" }
            );
            auth.login(responseData.userId, responseData.token);
            navigate("/admin/panel");
        } catch (err) { }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/admin/forgot-password",
                "POST",
                JSON.stringify({ email }),
                { "Content-Type": "application/json" }
            );
            setMessage("Kod e-posta adresinize gönderildi.");

            // 3 saniye sonra yönlendir
            setTimeout(() => {
                navigate("/admin/reset-password", { state: { email } }); // email bilgisini taşı
            }, 3000);

        } catch (err) { }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    {isForgotPassword ? "Şifre Sıfırlama" : "Admin Giriş"}
                </h2>

                {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
                {message && <div className="text-green-600 text-sm mb-4">{message}</div>}

                {!isForgotPassword ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Kullanıcı Adı</label>
                            <input
                                type="text"
                                className="mt-1 w-full border rounded-xl px-4 py-2 outline-none focus:ring focus:ring-blue-200"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Şifre</label>
                            <input
                                type="password"
                                className="mt-1 w-full border rounded-xl px-4 py-2 outline-none focus:ring focus:ring-blue-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium"
                        >
                            {isLoading ? <PulseLoader size={10} color={"#fff"} /> : "Giriş Yap"}
                        </button>
                        <div className="text-sm text-right">
                            <button
                                type="button"
                                onClick={() => setIsForgotPassword(true)}
                                className="text-blue-600 hover:underline"
                            >
                                Şifrenizi mi unuttunuz?
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Kayıtlı E-posta</label>
                            <input
                                type="email"
                                className="mt-1 w-full border rounded-xl px-4 py-2 outline-none focus:ring focus:ring-blue-200"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium"
                        >
                            {isLoading ? <PulseLoader size={10} color={"#fff"} /> : "Kod Gönder"}

                        </button>
                        <div className="text-sm text-right">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsForgotPassword(false);
                                    setMessage("");
                                }}
                                className="text-gray-600 hover:underline"
                            >
                                Giriş sayfasına dön
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
