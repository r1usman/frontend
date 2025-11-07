import { motion } from "framer-motion";
import W from "../../assests/W.png"
export default function HoverStack({ isActive, onClick }) {

  return (
     <motion.div
      onClick={onClick}
      className={`flex items-center justify-center bg-gray-100 rounded-xl w-40 h-40 cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-2 border-sky-500 shadow-lg scale-105"
          : "border border-transparent"
      }`}
      whileHover="hover"
    >

      <motion.div className="relative size-12">
        {/* Top image */}
        <motion.img
          src={W}
          alt="top"
          className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg object-cover"
          variants={{
            rest: { x: -10, y: 10, rotate: 0, scale: 1, zIndex: 1 },
            hover: {
              x: -30,
              y: 30,
              rotate: -10,
              zIndex: 1,
              transition: { type: "spring", stiffness: 200, damping: 15 },
            },
          }}
        />


        <motion.img
          src={W}
          alt="middle"
          className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg object-cover z-10"
          variants={{
            rest: { x: 0, y: 0, rotate: 0, scale: 1 },
            hover: {
              scale: 1.05,
              transition: { type: "spring", stiffness: 200, damping: 15 },
            },
          }}
        />
        <motion.img
          src={W}
          alt="bottom"
          className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg object-cover"
          variants={{
            rest: { x: 10, y: -10, rotate: 0, scale: 1, zIndex: 0 },
            hover: {
              x: 30,
              y: -30,
              rotate: 10,
              zIndex: 0,
              transition: { type: "spring", stiffness: 200, damping: 15 },
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
}
