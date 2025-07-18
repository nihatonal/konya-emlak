import React from 'react'
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Socials = ({ className }) => {
    return (

        <div className={`flex gap-4 ${className}`}>
            <a href="https://www.instagram.com/bagbahce_yatirim/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-white hover:bg-bvs-accentGold text-3xl
                border border-1 rounded-full hover:border-bvs-accentGold w-10 h-10 p-2
                transition" />
            </a>
            <a href="https://www.facebook.com/share/19phEu29m5/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="text-white hover:bg-bvs-accentGold text-3xl
                border border-1 rounded-full hover:border-bvs-accentGold w-10 h-10 p-2
                transition" />
            </a>
            <a href="https://wa.me/905079870088" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaWhatsapp className="text-white hover:bg-bvs-accentGold text-3xl
                border border-1 rounded-full hover:border-bvs-accentGold w-10 h-10 p-2
                transition" />
            </a>
        </div>


    )
}

export default Socials