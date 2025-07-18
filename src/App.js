import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n";
import HashLoader from "react-spinners/HashLoader";
import './App.css';
import './index.css';
//import ScrollToTop from './shared/util/ScrollToTop';

// import GoogleLoginComp from './shared/components/GoogleLoginComp';
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Header from './components/Header';
import Footer from './components/Footer';
//import WhatsappBtn from './shared/UI/WhatsappBtn';
// //pages
const Home = React.lazy(() => import("./pages/home/Home.js"));
// const PrivacyPolicy = React.lazy(() => import("./shared/components/PrivacyPolicy"));
// const VineyardInvestment = React.lazy(() => import("./pages/VineyardInvestment"));
// const InvestmentGuide = React.lazy(() => import("./pages/InvestmentGuide"));
// const VineyardManagementModel = React.lazy(() => import("./pages/VineyardManagementModel.js"));
// const Vineyards = React.lazy(() => import("./pages/vineyards/Vineyards.js"));
// const Contact = React.lazy(() => import("./pages/contact/Contact.js"));
// const AboutUs = React.lazy(() => import("./pages/aboutus/AboutUs.js"));
// const NotFoundPage = React.lazy(() => import("./shared/components/NotFoundPage.js"));
// //Blog Items
// const Blog = React.lazy(() => import("./pages/blog/Blog.js"));
// const VineyardInvestmentBlog = React.lazy(() => import("./pages/blog/VineyardInvestment.js"));
// const VineyardTrend = React.lazy(() => import("./pages/blog/VineyardTrend.js"));
// const VineyardKonya = React.lazy(() => import("./pages/blog/VineyardKonya.js"));




function App() {

  const { token, login, logout, userId } = useAuth();

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route exact path="/" element={<Home />} />
        {/*<Route path="*" element={<NotFoundPage />} /> */}
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" element={<Home />} />
        {/*<Route exact path="/neden-bag-yatirimi" element={<VineyardInvestment />} />
        <Route exact path="/bag-alim-sureci" element={<InvestmentGuide />} />
        <Route exact path="/bag-isletme-modeli" element={<VineyardManagementModel />} />
        <Route exact path="/konya-bozkir-hamzalar-baglarimiz" element={<Vineyards />} />
        <Route exact path="/hakkimizda" element={<AboutUs />} />
        <Route exact path="/iletisim" element={<Contact />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/blog/bag-yatirimi" element={<VineyardInvestmentBlog />} />
        <Route exact path="/blog/bag-trendleri" element={<VineyardTrend />} />
        <Route exact path="/blog/konyada-bag-yatirimi" element={<VineyardKonya />} />
        <Route exact path="/gizlilik" element={<PrivacyPolicy />} />
        <Route exact path="/404" element={<NotFoundPage />} /> */}
        {/* <Route exact path='/hizmet-sozlesmesi' element={<HizmetSozlesmesi />} /> */}
        {/* <Route exact path="/writecomment/:name/:location/:otel/:tid" element={<Tourist />} />
        <Route exact path='/admin' element={<Admin />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
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
        <BrowserRouter>

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
            {/* <ScrollToTop /> */}
            <Routes>{routes}</Routes>

            <Footer />
            {/* <WhatsappBtn /> */}
          </Suspense>

        </BrowserRouter>

      </AuthContext.Provider>
    </div >
  );
}

export default App;

