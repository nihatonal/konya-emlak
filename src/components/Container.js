import React from 'react'

const Container = ({ className, children }) => {
    return (
        <div className={`${className} max-w-7xl mx-auto py-16 px-4 `}>
            {children}
        </div>
    )
}

export default Container
