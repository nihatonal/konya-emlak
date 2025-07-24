import React from 'react';
import { blogs } from '../../data/index';
import { useLocation, useParams } from 'react-router-dom';
import PageHero from '../../components/layout/PageHero';
const SingleBlogPage = () => {
    const location = useLocation();
    const lng = location.pathname.split("/")[1]; // tr, en, vs.
    const { slug } = useParams();
    const blog = blogs.filter((blog) => blog.id === slug)[0];
    const content = { title: blog[lng].title, subtitle: "" }

    return (
        <div>
            <PageHero image={blog.image} content={content} />
            <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20'>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    🛠️ Sayfa Hazırlanıyor
                </h1>
                <p className="text-gray-600 max-w-xl">
                    Bu blog yazısı henüz yayına alınmadı. İçeriğimizi en kısa sürede sizinle paylaşacağız. Takipte kalın!
                </p>
            </div>
        </div>
    );
};

export default SingleBlogPage;
