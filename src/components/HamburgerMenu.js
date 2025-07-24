import React from "react";

export default function HamburgerMenu({ isOpen, setIsOpen }) {

    return (
        <button
            id="nav-icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="menu button"
            className={`
          relative z-[99] cursor-pointer
          w-[33px] h-[23px]
          transition-transform duration-500 ease-in-out
          scale-80
         
          ${isOpen ? "open_menu" : ""}
        `}
            style={{ transformOrigin: "center" }}
        >
            {/* 3 çizgi */}
            <span
                className={`
            block absolute bg-emerald-50 rounded-[10px] h-[3px]
            transition-all duration-300
            left-0
            ${isOpen ? "w-full" : "w-16"}
            top-[calc(0.5rem*2)] /* yaklaşık top-2 */
            ${isOpen ? "rotate-[135deg] top-[0.5rem]" : ""}
            `}
                style={{
                    top: isOpen ? "0.5rem" : "0.5rem",
                    width: isOpen ? "100%" : "4rem",
                    transformOrigin: "left",
                    transform: isOpen ? "rotate(135deg)" : "none",
                }}
            ></span>

            <span
                className={`
            block absolute bg-emerald-50 rounded-[10px] h-[3px]
            transition-all duration-300
            left-0
            ${isOpen ? "opacity-0 w-full" : "opacity-100 w-full"}
            top-[calc(0.5rem*3)] /* yaklaşık top-3 */
          `}
                style={{
                    top: "1.5rem",
                    opacity: isOpen ? 0 : 1,
                    right: isOpen ? "2rem" : "0",
                }}
            ></span>

            <span
                className={`
            block absolute bg-emerald-50 rounded-[10px] h-[3px]
            transition-all duration-300
            left-0
            ${isOpen ? "w-full" : "w-[6rem]"}
            top-[calc(0.5rem*4)] /* yaklaşık top-4 */
            ${isOpen ? "rotate-[45deg] top-[0.5rem]" : ""}
          `}
                style={{
                    top: isOpen ? "0.5rem" : "2rem",
                    width: isOpen ? "100%" : "6rem",
                    transformOrigin: "left",
                    transform: isOpen ? "rotate(45deg)" : "none",
                }}
            ></span>
        </button>
    );

}
