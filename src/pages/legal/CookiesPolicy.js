
import { useTranslation } from "react-i18next";
import usePageMeta from "../../hooks/usePageMeta";

export default function CookiesPolicy() {
  const { t } = useTranslation();
  usePageMeta(
    t('meta.cookies.title'),
    t('meta.cookies.description')
  );
  return (
    <section className="max-w-4xl mx-auto px-4 py-20 text-gray-800">
      <h1 className="text-3xl text-bvs-accentGold font-bold mb-6">{t("cookies.title")}</h1>

      <p className="mb-6">{t("cookies.intro")}</p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("cookies.whatAreCookies.title")}</h2>
        <p>{t("cookies.whatAreCookies.text")}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("cookies.typesOfCookies.title")}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>{t("cookies.typesOfCookies.necessary")}</strong></li>
          <li><strong>{t("cookies.typesOfCookies.analytics")}</strong></li>
          <li><strong>{t("cookies.typesOfCookies.preferences")}</strong></li>
          <li><strong>{t("cookies.typesOfCookies.marketing")}</strong></li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("cookies.manageCookies.title")}</h2>
        <p>{t("cookies.manageCookies.text")}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("cookies.changes.title")}</h2>
        <p>{t("cookies.changes.text")}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("cookies.contact.title")}</h2>
        <p>{t("cookies.contact.text")}</p>
      </div>
    </section>
  );
}
