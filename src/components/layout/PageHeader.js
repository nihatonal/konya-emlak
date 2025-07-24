import React from 'react'

const PageHeader = ({ children, className = "" }) => (
    <h2 className={`text-2xl md:text-3xl font-bold text-bvs-dark mb-8 ${className}`}>{children}</h2>
);

export default PageHeader
