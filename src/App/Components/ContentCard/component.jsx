import React from "react";

const ProductCard = ({ content, addToCart }) => {
  return (
    <div className="w-full sm:w-64 md:h-56 lg:h-64 bg-[#1C1C24] shadow-md border border-[#333C] my-0 rounded-lg flex flex-col">
      {/* Show image from database */}
      <img
        src={content?.["catalog-img src"]}
        alt={content?.name}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <div className="bg-[#000] bg-opacity-40 flex-1 flex flex-col justify-between">
        <div className="p-4">
          <h3 className="text-lg font-bold text-white truncate">
            {content?.name}
          </h3>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < content?.rating ? "text-yellow-400" : "text-yellow-300"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="text-sm text-yellow-600 ml-2">
              ({content?.rating ?? 0}/5)
            </span>
          </div>
          <p className="text-sm text-gray-300 mt-2 line-clamp-2">
            {content?.description}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xl text-[#4ACD8D]">${content?.price}</span>
            <button
              onClick={() => addToCart(content)}
              className="bg-[#8C6DFD] hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
            >
              Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;