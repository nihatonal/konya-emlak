import React from 'react';
import { NavLink } from 'react-router-dom';
import { blogs } from '../../data/index';
import { FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Container from '../layout/Container';
// Tarihe göre en yeni 4 blogu döndüren fonksiyon
function getLatestBlogs(language = 'tr', count = 4) {
  return blogs
    .map(blog => ({
      ...blog[language],
      id: blog.id,
      slug: blog[language].slug,
      tags: blog.tags?.[language] || blog.tags || [],
      date: blog.date,
      image: blog.image,
      original: blog
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}



// Örnek olarak tags alanını kendin ekleyebilirsin, eğer yoksa sabit örnek tags kullanalım
const defaultTags = {
  tr: ['Tarım', 'Yatırım', 'Üzüm', 'Organik'],
  en: ['Agriculture', 'Investment', 'Grapes', 'Organic']
};


const LatestBlogs = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language
  const latestBlogs = getLatestBlogs(language);
  return (
    <Container className="py-16">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-bvs-deepGreen mb-4"> {t("blog.title")}</h2>
      <p className="text-center text-bvs-darkGreen max-w-xl mx-auto mb-12">
        {t("blog.subtitle")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {latestBlogs.map(blog => (
          <article
            key={blog.id}
            className="border border-1 hover:border-bvs-darkGreen/50 rounded-lg overflow-hidden transition"
          >

            <div className="relative h-48 overflow-hidden rounded-t-lg">
              {blog?.image && <NavLink to={`blog/${blog.slug}`}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full max-h-80 object-cover"
                  loading="lazy"
                />
              </NavLink>}
            </div>

            <div className="bg-white p-5">
              <div className="text-xs flex items-center gap-5">
                <div className="flex items-center gap-2 relative group cursor-pointer">
                  {(blog.tags?.length ? blog.tags : defaultTags[language] || defaultTags.tr).slice(0, 2).map((tag, index) => (
                    <p
                      key={index}
                      className="relative font-semibold text-bvs-darkGreen tracking-wider"
                    >
                      {tag}
                      <span className="absolute left-0 -bottom-1.5 bg-bvs-softGreen inline-block w-full h-[2px] group-hover:bg-bvs-darkGreen/50 hover:cursor-pointer transition" />
                    </p>
                  ))}

                </div>
                <p className="flex items-center gap-1 text-bvs-lightGreen relative group hover:cursor-pointer hover:text-bvs-darkGreen transition">
                  <FaCalendarAlt className="text-gray-500" />{" "}
                  <time className="text-gray-500 text-xs mt-auto">
                    {new Date(blog.date).toLocaleDateString(language, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="absolute left-0 -bottom-1.5 bg-bvs-softGreen inline-block w-full h-[2px] group-hover:bg-bvs-darkGreen/50 transition" />
                </p>
              </div>
              <NavLink
                to={`blog/${blog.slug}`}
                className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-bvs-darkGreen transition"
              >
                {blog?.title}
              </NavLink>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
};

export default LatestBlogs;
