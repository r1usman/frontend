// // components/Header.jsx
import React from "react";
import PropTypes from "prop-types";

const Header = ({ logo }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left Side: Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          {/* Right Side: Navigation */}
          <div className="flex justify-center items-center gap-6 h-full">
            
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-200">
                Sign In
            </button>
            
            <button className="px-4 py-2 text-sm font-medium text-white bg-[#00C2B8] hover:bg-[#00a9a0] rounded-lg transition duration-200">
                Sign Up
            </button>
            
          </div>


        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default Header;


// import React from "react";

// const Header = ({ logo }) => {
//   return (
//     <header className="bg-[#14BF96] text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <img src={logo} alt="Logo" className="h-8 mr-3" />
//           <h1 className="text-xl font-bold">CodeForces</h1>
//         </div>
//         <nav className="hidden md:flex space-x-8">
//           <a href="#" className="hover:text-gray-200">Problems</a>
//           <a href="#" className="hover:text-gray-200">Contests</a>
//           <a href="#" className="hover:text-gray-200">Leaderboard</a>
//         </nav>
//         <div className="flex items-center space-x-4">
//           <button className="px-4 py-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition">
//             Sign In
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;