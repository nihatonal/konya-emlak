import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Masonry from "react-masonry-css";
import Container from "../layout/Container";
const TestimonialsSection = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const breakpointColumnsObj = {
        default: 4,
        1024: 3,
        768: 2,
        480: 1
    };
    const testimonials = [
        {
            name: "Ahmet Yılmaz",
            date: "March 2024",
            text_tr: "Bağ yatırımına ilk kez başladım ve süreç beklediğimden çok daha profesyonel ve şeffaftı. Ekip, her adımı sabırla anlattı ve yatırımımın her aşamasını düzenli olarak raporladı. Yatırımın geri dönüş süresi makul, yıllık gelir beklentisi de tatmin edici. Doğal olarak, portföyümü çeşitlendirmek isteyen herkese kesinlikle tavsiye ederim.",
            text_en: "I started my first vineyard investment and the process was much more professional and transparent than I expected. The team patiently explained every step and provided regular reports. The payback period is reasonable, and the annual income expectations are satisfying. Naturally, I highly recommend this for anyone wanting to diversify their portfolio."
        },
        {
            name: "Zeynep Kaya",
            date: "January 2024",
            text_tr: "Organik üretime olan ilgim ve sürdürülebilir tarıma katkı sağlama isteğimle başladığım bu yatırım, hem çevreci yaklaşımı hem de düzenli gelir imkanıyla beklentilerimi karşıladı. Uzun vadede değer artışı da cabası. Ekiple iletişim kolay ve destekleri sürekli. Gerçekten memnun kaldım.",
            text_en: "My interest in organic production and desire to support sustainable agriculture made me start this investment, which met my expectations with its eco-friendly approach and regular income. The long-term value increase is a bonus. Communication with the team is easy and their support is constant. I’m truly satisfied."
        },
        {
            name: "Mehmet Demir",
            date: "December 2023",
            text_tr: "Bağımı satın aldıktan sonra yönetimini tamamen profesyonel ekibe bıraktım. Böylece başka işlerle uğraşırken gelir elde etmeye başladım. Raporlama sistemleri sayesinde bağımın durumu hakkında sürekli bilgi sahibiyim. Uzun vadeli yatırım olarak düşündüğümde, kazancın yanı sıra değerin de artması beni memnun ediyor.",
            text_en: "After purchasing my vineyard, I completely entrusted the management to the professional team. Thus, I started earning income while dealing with other matters. Thanks to the reporting systems, I am always informed about the status of my vineyard. As a long-term investment, I’m pleased with both the income and the appreciation in value."
        },
        {
            name: "Elif Tuncer",
            date: "February 2024",
            text_tr: "Doğru yönlendirmeler ve detaylı organik üretim danışmanlığı sayesinde yatırımım çok verimli geçti. Kimyasal kullanmadan doğal yöntemlerle üretim yapmak bana ayrı bir huzur veriyor. Ayrıca, her adımda profesyonel destek aldım ve sorularım anında yanıtlandı. Yatırımımın hem çevre hem de ekonomik açıdan sürdürülebilir olması beni çok mutlu ediyor.",
            text_en: "Thanks to proper guidance and detailed organic production consultancy, my investment has been very productive. Producing with natural methods without chemicals gives me peace of mind. Also, I received professional support at every step and my questions were answered immediately. I’m very happy that my investment is sustainable both environmentally and economically."
        },
        {
            name: "Burak Arslan",
            date: "November 2023",
            text_tr: "İlk başta biraz çekincelerim vardı ancak yatırım süreci ilerledikçe ekibin profesyonelliği beni ikna etti. Sorularımı büyük bir sabırla cevapladılar ve süreç boyunca düzenli iletişim sağladılar. Yatırımımı kolay ve güvenilir şekilde gerçekleştirdim. Şimdi düzenli gelir elde etmekten mutluyum ve bu fırsatı herkese öneriyorum.",
            text_en: "At first, I had some doubts, but as the investment progressed, the team’s professionalism convinced me. They patiently answered my questions and maintained regular communication throughout. I completed my investment easily and reliably. Now, I’m happy to earn regular income and recommend this opportunity to everyone."
        },
        {
            name: "Fatma Bozkurt",
            date: "October 2023",
            text_tr: "Sürdürülebilir ve uzun vadeli bir gelir kaynağı arayanlar için ideal bir yatırım. Organik ve çevreci üretim koşulları, hem doğaya hem de yatırımcısına değer katıyor. Bağımın düzenli bakımı ve ürün kalitesi ekip sayesinde çok iyi. Herkesin bu fırsatı değerlendirmesini öneririm.",
            text_en: "An ideal investment for those seeking sustainable and long-term income. Organic and eco-friendly production conditions add value both to nature and the investor. Thanks to the team, my vineyard is well maintained and the product quality is excellent. I recommend everyone to seize this opportunity."
        },
        {
            name: "Kemal Çetin",
            date: "September 2023",
            text_tr: "Bağ sahibi olmak çocukluk hayalimdi ve bu yatırımla gerçek oldu. Profesyonel yönetim sayesinde her detayla ilgileniliyor, ben sadece kazancımı izliyorum. Yatırım sürecinde ekip sürekli bilgilendiriyor ve destek veriyor. Pişman olmadım, herkese tavsiye ederim.",
            text_en: "Owning a vineyard was my childhood dream and it came true with this investment. Thanks to professional management, every detail is handled and I just watch my profits. The team continuously informs and supports me during the investment process. No regrets, I recommend it to everyone."
        },
        {
            name: "Ayşe Nur",
            date: "August 2023",
            text_tr: "Hiç zahmet çekmeden, güvenilir bir yatırım arayanlar için mükemmel bir fırsat. Ekip çok ilgili, her soruma titizlikle yanıt verdiler. Organik üretim ve sürdürülebilirlik konularında da çok bilinçliler. Bu yatırımı tercih ettiğim için çok mutluyum.",
            text_en: "A perfect opportunity for those looking for hassle-free and reliable investment. The team is very attentive and answered all my questions carefully. They are also very knowledgeable about organic production and sustainability. I’m very happy I chose this investment."
        }
    ];

    function formatDate(dateString, lang) {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
            year: "numeric",
            month: "long"
        }).format(date);
    }

    function AvatarBadge({ name }) {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        const pastelColors = [
            "#d199a0", // koyu pastel pembe
            "#a3c1ad", // pastel koyu yeşil
            "#9f91cc", // pastel koyu mor
            "#89aab8", // koyu pastel mavi
            "#b8a17f", // pastel toprak
            "#c09f80", // koyu pastel şeftali
            "#a1b4a6", // grimsi pastel yeşil
            "#c38d94", // gül kurusu pastel
            "#bfb1d0"  // koyu pastel leylak
        ];
        const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        return (
            <div
                style={{ backgroundColor: randomColor }}
                className="w-12 h-12 rounded-full text-white font-bold flex items-center justify-center text-lg select-none shado">
                {initials}
            </div>
        );
    }
    const renderCard = (item) => (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-full max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-4">
                <AvatarBadge name={item.name} />
                <div>
                    <h3 className="font-semibold text-lg text-green-900">{item.name}</h3>
                    <time className="text-sm text-gray-400">{formatDate(item.date, lang)}</time>
                </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{item[`text_${lang}`]}</p>
        </div>
    );

    return (
        <Container className="py-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-bvs-deepGreen mb-2">
                    {t("testimonials.title")}
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">{t("testimonials.subtitle")}</p>
            </div>

            {/* LARGE SCREEN GRID */}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="hidden md:flex w-auto gap-8"
                columnClassName="bg-transparent"
            >
                {testimonials.map((item) => (
                    <div key={item.name} className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <AvatarBadge name={item.name} />
                            <div>
                                <h3 className="font-semibold text-lg text-bvs-darkGreen">{item.name}</h3>
                                <time className="text-sm text-gray-400">{formatDate(item.date, lang)}</time>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{item[`text_${lang}`]}</p>
                    </div>
                ))}
            </Masonry>

            {/* SMALL SCREEN SLIDER */}
            <div className="md:hidden relative z-[10]">
                <Swiper spaceBetween={20} slidesPerView={1.1}>
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.name}>{renderCard(item)}</SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    );
};

export default TestimonialsSection;
