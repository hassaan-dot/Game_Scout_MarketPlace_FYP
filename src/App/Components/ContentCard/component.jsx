const ProductCard = ({ content, addToCart, isFeatured = false }) => {
  return (
    <a
      href={content?.["game-list-item href"]}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group block w-full ${
        isFeatured ? "md:h-72 lg:h-80" : "sm:w-64 md:h-56 lg:h-66"
      } bg-cover shadow-md border border-[#333C] overflow-hidden`}
    >
      <img
        className={`w-full ${
          isFeatured ? "h-72 lg:h-80" : "sm:w-64 md:h-56 lg:h-60"
        } bg-cover bg-center shadow-md border-[#333C] my-0`}
        src={content?.["catalog-img src"]}
        alt={content?.name}
      />

      <div className="bg-[#000] bg-opacity-40 p-2 -mt-24 relative">
        <h3 className="text-lg font-bold text-white truncate">
          {content?.name}
        </h3>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xl text-[#4ACD8D]">${content?.price}</span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
