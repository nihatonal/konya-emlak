import React, { useState } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    // Çerez ayarlamaları
    document.cookie = "cookieConsent=true; max-age=31536000; path=/;";
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <p>Bu site çerezler kullanmaktadır. Kullanımı kabul ediyorsanız, 'Kabul Et' butonuna tıklayın.</p>
      <button onClick={handleAccept}>Kabul Et</button>
    </div>
  );
};

export default CookieConsent;
