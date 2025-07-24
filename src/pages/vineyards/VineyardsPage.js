import React from 'react';
import { useTranslation } from 'react-i18next';
import usePageMeta from '../../hooks/usePageMeta';
import vineyard_1 from '../../assets/images/vineyard_1.webp';
import driedgrapes from '../../assets/images/Leonardo_Lightning_XL_A_wideangle_highresolution_photo_of_sund_1.webp'
import map from "../../assets/images/konya-bozkir-hamzalar-harita.webp"
import PageHero from '../../components/layout/PageHero';
const VineyardsPage = () => {
    const { t } = useTranslation();
    const info = t('vineyards', { returnObjects: true });
    const bolge = t('vineyards.bolge_tanitimi', { returnObjects: true });
    const iklimToprak = t('vineyards.iklim_ve_toprak', { returnObjects: true });
    const uzumler = t('vineyards.uzum_turleri', { returnObjects: true });
    const yontemler = t('vineyards.bagcilik_yontemleri', { returnObjects: true });
    const hasatIsleme = t('vineyards.hasat_ve_isleme', { returnObjects: true });
    const ekonomi = t('vineyards.ekonomik_etki', { returnObjects: true });

    usePageMeta(
        t('meta.vineyards.title'),
        t('meta.vineyards.description')
    );

    return (
        <div className="bg-bvs-lightGreen text-bvs-deepGreen">

            {/* Hero Section */}
            <PageHero image={vineyard_1} content={info} />


            {/* Bölge Tanıtımı */}
            <section className="py-16 px-6 md:px-0 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold">{bolge.isim}</h2>
                <p className="mt-4">{bolge.aciklama}</p>
                <p className="mt-4">{bolge.tarihce}</p>

            </section>

            {/* İklim ve Toprak */}
            <section className="max-w-7xl pb-16 mx-auto grid md:grid-cols-2 gap-12">
                <div className='bg-white py-16 px-6 grid gap-12'>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">İklim</h3>
                        <p>{iklimToprak.iklim}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Toprak</h3>
                        <p>{iklimToprak.toprak}</p>
                    </div>
                </div>
                <img
                    src={map}
                    alt="Hamzalar Bölgesi"
                    className="h-full w-full object-cover shadow-lg"
                />
            </section>

            {/* Üzüm Türleri */}
            <section className="py-20 px-6 bg-bvs-softGreen">
                <h2 className="text-3xl font-bold text-center mb-12">Üzüm Türleri</h2>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    {uzumler.map((uzum, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl shadow">
                            <h3 className="font-bold text-bvs-deepGreen">{uzum.isim}</h3>
                            <p className="mt-2 text-bvs-midGreen">{uzum.ozellikler}</p>
                        </div>
                    ))}
                </div>
                <img
                    src={driedgrapes}
                    alt="Üzüm Bağları"
                    className="h-96 w-full object-cover rounded-xl mt-12 mx-auto shadow-lg max-w-7xl"
                />
            </section>

            {/* Bağcılık Yöntemleri */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Bağcılık Yöntemleri</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {yontemler.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 shadow">
                            <h4 className="text-xl font-semibold text-bvs-darkGreen">{item.yontem}</h4>
                            <p className="mt-3">{item.aciklama}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Hasat ve İşleme */}
            <section className="bg-bvs-midGreen py-20 px-6 text-white">
                <h2 className="text-3xl font-bold text-center mb-12">Hasat ve İşleme</h2>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    {hasatIsleme.map((item, idx) => (
                        <div key={idx} className="bg-bvs-darkGreen p-6 rounded-xl">
                            <h4 className="text-xl font-semibold">{item.type}</h4>
                            <p className="mt-3 text-bvs-softGreen">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ekonomik Etki */}
            <section className="bg-white py-20 px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Ekonomik Etki</h2>
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
                    {ekonomi.map((item, idx) => (
                        <div key={idx} className="border p-5 rounded-xl">
                            <h4 className="font-bold text-bvs-deepGreen">{item.type}</h4>
                            <p className="mt-3">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default VineyardsPage;
