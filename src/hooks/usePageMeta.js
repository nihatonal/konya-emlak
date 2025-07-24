import { useEffect } from 'react';

const usePageMeta = (title, description) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }

        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            } else {
                const newMeta = document.createElement('meta');
                newMeta.name = "description";
                newMeta.content = description;
                document.head.appendChild(newMeta);
            }
        }
    }, [title, description]);
};

export default usePageMeta;
