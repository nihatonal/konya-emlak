import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./i18n";
import HashLoader from "react-spinners/HashLoader";
import './App.css';
import './index.css';

import { HelmetProvider } from 'react-helmet-async';
// import GoogleLoginComp from './shared/components/GoogleLoginComp';
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
//import WhatsappBtn from './shared/UI/WhatsappBtn';
//pages
const Home = React.lazy(() => import("./pages/home/Home.js"));
const AboutUs = React.lazy(() => import("./pages/about/AboutUs.js"));
const Blog = React.lazy(() => import("./pages/blog/Blog.js"));
const VineyardsPage = React.lazy(() => import("./pages/vineyards/VineyardsPage.js"));
const Contact = React.lazy(() => import("./pages/contact/Contact.js"))
const WhyVineyard = React.lazy(() => import('./pages/whyvineyard/WhyVineyard.js'));
const Process = React.lazy(() => import('./pages/process/Process.js'))
const Managment = React.lazy(() => import('./pages/managment/VineyardManagment.js'));
const SingleBlogPage = React.lazy(() => import('./pages/blog/SingleBlogPage.js'))

function App() {

  const { token, login, logout, userId } = useAuth();


  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);

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
        <Route path="/:lng">
          <Route index element={<Home />} />  {/* yani /:lng */}
          {/*<Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route index element={<Home />} />
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
              <Header />
              <ScrollToTop />
              <Routes>{routes}</Routes>

              <Footer />
              {/* <WhatsappBtn /> */}
            </Suspense>

          </BrowserRouter>
        </HelmetProvider>

      </AuthContext.Provider>
    </div >
  );
}

export default App;

