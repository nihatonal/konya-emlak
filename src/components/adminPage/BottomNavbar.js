// BottomNavbar.jsx
import { motion, AnimatePresence } from "framer-motion";
export default function BottomNavbar({ navItems, activeTab, setActiveTab }) {


  return (
    <div className="max-w-2xl mx-auto fixed bottom-3 inset-x-4 bg-slate-100 shadow-lg rounded-2xl 
    grid grid-cols-5 gap-1 py-2 px-4 items-center z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center justify-center px-4 py-2 rounded-xl transition duration-300
              ${isActive
                ? "bg-gradient-to-br from-bvs-midGreen to-bvs-darkGreen text-white shadow-lg scale-[1.03] border border-blue-300"
                : "text-gray-500"
              }`}
          >
            {/* İkon */}
            <div
              className={
                isActive
                  ? "scale-[1.4] md:icon-slide-in"
                  : "md:icon-slide-out"
              }
            >
              {item.icon}
            </div>

            {/* Label */}
            { /* md:block ile mobilde gizle */}
            <span
              className={`hidden md:inline-block ml-2 text-sm font-medium
                ${isActive
                  ? "label-slide-in"
                  : "label-slide-out"
                }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}


