import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { blogs } from '../../data/index';
import { FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import hero from '../../assets/images/blog/tabakta-kuru-uzum.jpg'
import usePageMeta from '../../hooks/usePageMeta';
import PageHero from '../../components/layout/PageHero';
function getLatestBlogs(language = 'tr', count = 4) {
    return blogs
        .map(blog => {
            const langData = blog[language];
            if (!langData || !langData.slug) {
                console.warn('Eksik blog verisi:', blog.id, blog);
                return null;
            }

            return {
                ...langData,
                id: blog.id,
                slug: langData.slug,
                tags: blog.tags?.[language] || blog.tags || [],
                date: blog.date,
                image: blog.image,
                original: blog
            };
        })
        .filter(Boolean) // null'ları filtrele
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
}
console.log(blogs)
const defaultTags = {
    tr: ['Tarım', 'Yatırım', 'Üzüm', 'Organik'],
    en: ['Agriculture', 'Investment', 'Grapes', 'Organic']
};

const Blog = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const lng = location.pathname.split("/")[1]; // tr, en, vs.

    const language = i18n.language;
    const latestBlogs = getLatestBlogs(lng);
    const content = t("blogPage", { returnObjects: true })

    usePageMeta(
        t('meta.blog.title'),
        t('meta.blog.description')
    );

    return (
        <div className="bg-bvs-lightGreen text-bvs-deepGreen">

            {/* Hero Section */}
            <PageHero image={hero} content={content} />

            {/* Blog List Section */}
            <section className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    {latestBlogs.map(blog => (
                        <article
                            key={blog.id}
                            className="border border-1 hover:border-bvs-darkGreen/50 rounded-lg overflow-hidden transition bg-white"
                        >
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                                {blog?.image && <NavLink to={`${blog.slug}`}>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full max-h-80 object-cover"
                                        loading="lazy"
                                    />
                                </NavLink>}
                            </div>

                            <div className="p-5 flex flex-col justify-between">
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
                                        <FaCalendarAlt className="text-gray-500" />
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
                                <h3

                                    className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-bvs-darkGreen transition block"
                                >
                                    {blog?.title}
                                </h3>
                                <p className='line-clamp-3'>
                                    {blog?.description}
                                </p>
                                <div className='flex justify-end'>
                                    <NavLink
                                        className={"inline-block mt-4 text-sm font-semibold text-bvs-midGreen hover:text-bvs-darkGreen transition-colors duration-200 relative group"}
                                        to={`${blog.slug}`}>
                                        {t("blogPage.readMore")}
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-bvs-darkGreen transition-all duration-300 group-hover:w-full"></span>
                                    </NavLink>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Blog;
