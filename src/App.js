import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./i18n";
import HashLoader from "react-spinners/HashLoader";
import './App.css';
import './index.css';

import { HelmetProvider } from 'react-helmet-async';
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './components/adminPage/LoginPage ';
import AdminPanel from './pages/admin/AdminPanel';
import ResetPasswordVerifyPage from './pages/admin/ResetPasswordVerifyPage';

//pages
const Home = React.lazy(() => import("./pages/home/Home.js"));
const AboutUs = React.lazy(() => import("./pages/about/AboutUs.js"));
const Blog = React.lazy(() => import("./pages/blog/Blog.js"));
const VineyardsPage = React.lazy(() => import("./pages/vineyards/VineyardsPage.js"));
const Contact = React.lazy(() => import("./pages/contact/Contact.js"))
const WhyVineyard = React.lazy(() => import('./pages/whyvineyard/WhyVineyard.js'));
const Process = React.lazy(() => import('./pages/process/Process.js'))
const Managment = React.lazy(() => import('./pages/managment/VineyardManagment.js'));
const SingleBlogPage = React.lazy(() => import('./pages/blog/SingleBlogPage.js'));
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy.js'));
const CookiesPolicy = React.lazy(() => import('./pages/legal/CookiesPolicy.js'));
const TermOfUse = React.lazy(() => import('./pages/legal/TermOfUse.js'));
const FaqPage = React.lazy(() => import('./pages/legal/FaqPage.js'));


function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {

  const { token, login, logout, userId } = useAuth();


  // useEffect(() => {
  //   window.history.scrollRestoration = 'manual'
  // }, []);

  function LanguageRedirector() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === "/") {
        // i18next'in localStorage'da tuttuğu dil (örn: "tr" veya "en")
        const savedLang = localStorage.getItem("i18nextLng");
        const lang = savedLang?.startsWith("tr") ? "tr" : "en";
        navigate(`/${lang}`, { replace: true });
      }
    }, [location.pathname, navigate]);

    return null;
  }

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/admin">
          {/* <Route path="login" element={<LoginPage />} /> */}
          <Route path="panel" element={<AdminPanel />} />
          <Route path="*" element={<AdminPanel />} />
        </Route>
        <Route path="/:lng">
          <Route path="/:lng">
            <Route index element={<Home />} />  {/* yani /:lng */}
            <Route path="hakkimizda" element={<AboutUs />} /> {/* /:lng/hakkimizda */}
            <Route path="about-us" element={<AboutUs />} />   {/* /:lng/about-us */}
            <Route path="blog" element={<Blog />} />  {/* /:lng/blog */}
            <Route path="blog/:slug" element={<SingleBlogPage />} />
            <Route path="vineyards" element={<VineyardsPage />} />
            <Route path="baglarimiz" element={<VineyardsPage />} />  {/* /:lng/vineyardsPAge */}
            <Route path="iletisim" element={<Contact />} />
            <Route path="contact" element={<Contact />} />
            <Route path="neden-bag-yatirimi" element={<WhyVineyard />} />
            <Route path="why-vineyard-investment" element={<WhyVineyard />} />
            <Route path="bag-alim-sureci" element={<Process />} />
            <Route path="buying-process" element={<Process />} />
            <Route path="bag-isletme" element={<Managment />} />
            <Route path="vineyard-management" element={<Managment />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="gizlilik" element={<PrivacyPolicy />} />
            <Route path="cookies" element={<CookiesPolicy />} />
            <Route path="cerezler" element={<CookiesPolicy />} />
            <Route path="terms-of-service" element={<TermOfUse />} />
            <Route path="kullanim-kosullari" element={<TermOfUse />} />
            <Route path="sik-sorulan-sorular" element={<FaqPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<AdminPanel />} /> */}
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route index element={<Home />} />
        <Route path="/admin">
          <Route path="login" element={<LoginPage />} />
          <Route path="reset-password" element={<ResetPasswordVerifyPage />} />
        </Route>
        <Route path="/:lng">
          <Route index element={<Home />} />  {/* yani /:lng */}
          <Route path="hakkimizda" element={<AboutUs />} /> {/* /:lng/hakkimizda */}
          <Route path="about-us" element={<AboutUs />} />   {/* /:lng/about-us */}
          <Route path="blog" element={<Blog />} />  {/* /:lng/blog */}
          <Route path="blog/:slug" element={<SingleBlogPage />} />
          <Route path="vineyards" element={<VineyardsPage />} />
          <Route path="baglarimiz" element={<VineyardsPage />} />  {/* /:lng/vineyardsPAge */}
          <Route path="iletisim" element={<Contact />} />
          <Route path="contact" element={<Contact />} />
          <Route path="neden-bag-yatirimi" element={<WhyVineyard />} />
          <Route path="why-vineyard-investment" element={<WhyVineyard />} />
          <Route path="bag-alim-sureci" element={<Process />} />
          <Route path="buying-process" element={<Process />} />
          <Route path="bag-isletme" element={<Managment />} />
          <Route path="vineyard-management" element={<Managment />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="gizlilik" element={<PrivacyPolicy />} />
          <Route path="cookies" element={<CookiesPolicy />} />
          <Route path="cerezler" element={<CookiesPolicy />} />
          <Route path="terms-of-service" element={<TermOfUse />} />
          <Route path="kullanim-kosullari" element={<TermOfUse />} />
          <Route path="sik-sorulan-sorular" element={<FaqPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </React.Fragment>
    );
  }

  return (
    <div className="root-wrapper">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <HelmetProvider>
          <BrowserRouter>
            <LanguageRedirector />

            <Suspense
              fallback={
                <div className='suspense_container'>
                  <HashLoader
                    color={'rgb(4, 51, 59)'}
                    loading={true}
                    cssOverride={''}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              }
            >
              {/* <Header /> */}
              <ScrollToTop />
              <LayoutWrapper>
                <Routes>{routes}</Routes>
              </LayoutWrapper>
              {/* <Footer /> */}
              {/* <WhatsappBtn /> */}
            </Suspense>

          </BrowserRouter>
        </HelmetProvider>

      </AuthContext.Provider>
    </div >
  );
}

export default App;

