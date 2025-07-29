import React from 'react';
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { blogs } from '../../data/index';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import PageHero from '../../components/layout/PageHero';
const SingleBlogPage = () => {
    const location = useLocation();
    const lng = location.pathname.split("/")[1]; // tr, en, vs.
    const { slug } = useParams();

    //find blog
    const blog = blogs.filter((blog) => blog[lng].slug === slug)[0];

    const content = { title: blog[lng].title, subtitle: "" }
    
    //find blog by lang
    const data = blog[lng];

    return (
        <div>
            <PageHero image={blog.image} content={content} />
            <div className='max-w-7xl mx-auto md:flex mb-10'>
                {data ? <div className="md:w-2/3 px-4 py-10">
                    {/* Başlık ve Açıklama */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-bvs-midGreen">
                            {data.title}
                        </h1>
                        <p className="text-lg text-gray-600">{data.description}</p>
                        <div className="flex items-center text-sm text-gray-400 mt-2">
                            <span>{blog.author.name}</span>
                            <ChevronRight size={16} className="mx-1" />
                            <span>{new Date(blog.date).toLocaleDateString(lng)}</span>
                        </div>
                    </motion.div>

                    {/* İçerik Bölümleri */}
                    <div className="space-y-16">
                        {data.content.map((section, index) => (
                            <motion.section
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-semibold text-bvs-midGreen">
                                    {section.heading}
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{section.text}</p>

                                {section.image && (
                                    <img
                                        src={section.image}
                                        alt={section.heading}
                                        className="w-full h-96 object-cover rounded-lg shadow-md mt-4"
                                    />
                                )}

                                {section.bullets && (
                                    <div className="mt-4">
                                        <h3 className="font-medium text-lg text-bvs-gold mb-2">
                                            {section.bulletsTitle}
                                        </h3>
                                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                                            {section.bullets.map((bullet, i) => (
                                                <li key={i}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.section>
                        ))}
                    </div>

                    {/* Özet */}
                    <motion.div
                        className="mt-16 bg-bvs-lightGreen/10 p-6 rounded-xl border border-bvs-lightGreen"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-semibold text-bvs-green mb-2">
                            {lng === "tr" ? "Özet" : "Summary"}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
                    </motion.div>
                </div> :
                    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20'>
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                            🛠️ Sayfa Hazırlanıyor
                        </h1>
                        <p className="text-gray-600 max-w-xl">
                            Bu blog yazısı henüz yayına alınmadı. İçeriğimizi en kısa sürede sizinle paylaşacağız. Takipte kalın!
                        </p>
                    </div>}

                <BlogLeft className="md:w-1/3 px-4" lng={lng} />
            </div>

        </div>
    );
};

const BlogLeft = ({ lng, className }) => {

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
    const blogs_ = getLatestBlogs(lng);
    return (
        <div className={className}>
            <div className="md:sticky top-[80px] border border-bvs-darkGreen p-5 rounded-md mt-10">
                <h3 className="text-base">Latest Blogs</h3>
                <div className="space-y-4 mt-4 border">
                    {blogs_?.map((blog, index) => (
                        <NavLink
                            to={`/${lng}/blog/${blog.slug}`}
                            key={index}
                            className="flex items-center gap-2 group"
                        >
                            {blog && (
                                <img
                                    src={blog.image}
                                    alt="blogImage"
                                    width={100}
                                    height={100}
                                    className="w-16 h-16 rounded-full object-cover border-[1px] border-bvs-midGreen group-hover:border-bvs-darkGreen transition"
                                />
                            )}
                            <p className="line-clamp-2 text-sm text-bvs-darkGreen group-hover:text-bvs-deepGreen transition">
                                {blog?.title}
                            </p>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleBlogPage;
