// import React from "react";
// import PropTypes from "prop-types";

// const Header = ({ logo }) => {
//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">

//           {/* Left Side: Logo */}
//           <div className="flex items-center space-x-2">
//             <img src={logo} alt="Logo" className="h-16 w-auto" />
//           </div>

//           {/* Right Side: Navigation */}
//           <div className="flex justify-center items-center gap-6 h-full">
            
//             <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-200">
//                 Sign In
//             </button>
            
//             <button className="px-4 py-2 text-sm font-medium text-white bg-[#00C2B8] hover:bg-[#00a9a0] rounded-lg transition duration-200">
//                 Sign Up
//             </button>
            
//           </div>


//         </div>
//       </div>
//     </nav>
//   );
// };

// Header.propTypes = {
//   logo: PropTypes.string.isRequired,
// };

// export default Header;

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
            
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#5737F6] transition duration-200">
                Sign In
            </button>
            
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#5737F6] to-[#9612FA] hover:from-[#461fd6] hover:to-[#7e0ad4] rounded-lg transition duration-200">
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