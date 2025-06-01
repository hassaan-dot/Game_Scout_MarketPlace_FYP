// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className="text-white p-4">
//       <ul className="flex space-x-6 justify-center">
//         <li className="cursor-pointer hover:opacity-80">Deals</li>
//         <li className="cursor-pointer hover:opacity-80">News</li>
//         <li className="cursor-pointer hover:opacity-80">Games</li>
//         <li className="cursor-pointer hover:opacity-80">Prepaids</li>
//         <li className="cursor-pointer hover:opacity-80 relative">
//           More ▼
//         </li>
//       </ul>
//     </nav> 
//   );
// };

// export default Navbar;
import React from "react";

const navItems = [
  { label: "Deals", link: "/Home" },
  { label: "News", link: "/news" },
  { label: "Games", link: "/games" },
  { label: "Prepaids", link: "/prepaids" },
  { label: "More ▼", link: "/more" },
];

const Navbar = () => {
  return (
    <nav className="text-white p-4">
      <ul className="flex space-x-6 justify-center">
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item.link}>
              <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                {item.label}
              </button>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
