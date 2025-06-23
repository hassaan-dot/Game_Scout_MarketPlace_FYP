import {
  FaXbox,
  FaPlaystation,
  FaWindows,
  FaGamepad,
  FaDashcube,
} from "react-icons/fa";

const ProductCard = ({ content, addToCart, isFeatured = false, onClick }) => {
  return (
    <a
      // href={content?.["game-list-item href"]}
      target="_blank"
      onClick={() => onClick(content)}
      rel="noopener noreferrer"
      className={`relative group block w-full ${
        isFeatured ? "md:h-72 lg:h-64" : "sm:w-64 md:h-56 lg:h-66"
      } rounded-xl overflow-hidden shadow-lg border border-[#2a2a2a] bg-[#1a1a1a] transition-transform transform hover:scale-[1.015]`}
    >
      <div className="w-full h-full overflow-hidden">
        <img
          className={`w-full object-cover object-center transition-all duration-300 ease-in-out ${
            isFeatured ? "h-72 lg:h-60" : "sm:w-64 md:h-56 lg:h-60"
          } group-hover:scale-105`}
          src={content?.["catalog-img src"]}
          alt={content?.name}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
        <h3 className="text-lg font-semibold text-white truncate">
          {content?.name}
        </h3>

        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-2 text-white text-sm">
            <FaXbox title="Xbox" />
            <FaPlaystation title="PlayStation" />
            <FaWindows title="Windows" />
            <FaGamepad title="Gamepad" />
            {/* <FaDashcube title="Other" /> */}
          </div>

          <span className="text-xl font-bold text-[#4ACD8D] bg-[#ffffff0a] px-2 py-1 rounded-lg shadow-sm">
            ${content?.price}
          </span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
