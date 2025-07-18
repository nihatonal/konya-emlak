import React from 'react'

const Button = ({ classButtonWrapper, btnClassName, type, to, label, onClick, ariaLabel }) => {
    return (
        <div className={`${classButtonWrapper} flex`}>
            {type === "button" && <button
                onClick={onClick}
                aria-label={ariaLabel}
                className={`${btnClassName} inline-block bg-bvs-accentGold text-white font-semibold px-8 py-3 rounded-full shadow-md hover:opacity-90`}>
                {label}
            </button>}
            {type === "link" && <a
                href={to}
                aria-label={ariaLabel}
                className={`${btnClassName} inline-block bg-bvs-accentGold text-white font-semibold px-8 py-3 rounded-full shadow-md hover:opacity-90`}>
                {label}
            </a>}
        </div>
    )
}

export default Button