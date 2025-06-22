import React from "react";
import { FaWindows, FaXbox, FaPlaystation } from "react-icons/fa";
import { useModalStore } from "../../../store/useModalStore";

const GameDeals = () => {
  const { detailData } = useModalStore();

  const platforms = Object.entries(detailData)
    .filter(([key]) => key.includes("catalog-game-support"))
    .map(([, value]) => value)
    .filter(Boolean);

  const uniquePlatforms = [...new Set(platforms)];

  return (
    <div className=" text-white px-6 py-0 mt-2 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">
        Buy <span className="text-[#4ACD8D]">{detailData?.name}</span> at the
        Best Price
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={detailData?.["catalog-img src"]}
            alt="Elden Ring Nightreign"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#4ACD8D] mb-4">
            Top retailers
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-600 pb-2">
              <span className="text-lg">
                🐧{detailData?.["catalog-shop-name"]}
              </span>
              <span className="text-[#4ACD8D] font-semibold">
                $ {detailData?.price}
              </span>
              <FaXbox className="text-[#4ACD8D]" />
            </div>
            <div className="flex items-center justify-between border-b border-gray-600 pb-2">
              <span className="text-lg">🎨 Eneba</span>
              <span className="text-[#4ACD8D] font-semibold">$ 31.17</span>
              <FaXbox className="text-[#4ACD8D]" />
            </div>
            <div className="flex items-center justify-between pb-2">
              <span className="text-lg">📦 Gaming</span>
              <span className="text-[#4ACD8D] font-semibold">$ 35.14</span>
              <FaWindows className="text-[#4ACD8D]" />
            </div>
          </div>

          <p className="text-gray-300 mt-6 text-sm leading-relaxed">
            <strong className="text-white">{detailData?.name}</strong> is a
            hauntingly atmospheric adventure set in the
            <em> Elden Ring</em> universe, plunging players into a realm
            shrouded in darkness and mystery.
          </p>
          <p className="text-gray-400 mt-3 text-sm">
            It's a standalone expansion offering a new type of experience —
            fight fearsome bosses in challenging encounters and cooperate to
            achieve victory in brutal battles.
          </p>
          <p className="text-[#4ACD8D] mt-3 text-sm font-semibold cursor-pointer">
            Read more
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {uniquePlatforms.map((label, i) => (
          <button
            key={i}
            className="bg-[#4ACD8D] text-black px-4 py-1 rounded text-sm flex items-center gap-2"
          >
            {label.includes("Xbox") ? (
              <FaXbox />
            ) : label.includes("PS") ? (
              <FaPlaystation />
            ) : (
              <FaWindows />
            )}
            {label}
          </button>
        ))}
      </div>

      {/* Edition Buttons
      <div className="mt-6 flex flex-wrap gap-3">
        {[
          "All types",
          "DELUXE EDITION",
          "DELUXE EDITION + PREORDER BONUS",
          "+ PRE-ORDER BONUS",
        ].map((label, i) => (
          <button
            key={i}
            className="bg-[#4ACD8D] text-black px-3 py-1 rounded text-xs font-semibold"
          >
            {label}
          </button>
        ))}
      </div> */}

      <div className="mt-10 border-t border-gray-600 pt-6">
        <h3 className="text-lg font-bold text-[#4ACD8D]">
          TECHNICAL INFORMATION
        </h3>
        <p className="text-sm mt-2 text-gray-300">
          <strong>Categories:</strong>{" "}
          <span className="text-[#4ACD8D]">Action, Role-Playing</span>
        </p>
        <p className="text-sm text-gray-300">
          <strong>Editor:</strong> FromSoftware
        </p>
        <p className="text-sm text-gray-300">
          <strong>Developer:</strong> FromSoftware
        </p>
        <p className="text-sm text-gray-300">
          <strong>Modes:</strong> Solo, Multiplayer, Co-op
        </p>
        <p className="text-sm text-gray-300">
          <strong>Release Date:</strong> May 20, 2025
        </p>
      </div>
    </div>
  );
};

export default GameDeals;
