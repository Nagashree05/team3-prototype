"use client";

import { useState } from "react";
import clsx from "clsx";

import MinimalMaximalGame from "./MinimalMaximalGame";
import UpperLowerBoundsGame from "./UpperLowerBoundsGame";
import LatticeVisualizerGame from "./LatticeVisualizerGame";    

/* 
  ================
   MAIN PAGE COMPONENT with nav panel
  ================
*/
export default function PosetsPage() {
  const [activeGame, setActiveGame] = useState<"minimalMaximal" | "upperLower" | "lattice">(
    "minimalMaximal"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#96a86c] to-[#5c6b47] flex items-start justify-center px-4 py-8">
      {/* Outer Container (Card) */}
      <div className="w-full max-w-4xl bg-[#f7f2d8] p-6 rounded-lg shadow-lg flex flex-col items-center text-black">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-[#a65c1c] mb-6 text-center">
          Poset Games
        </h1>

        {/* Navigation Buttons (Top Pane) */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveGame("minimalMaximal")}
            className={clsx(
              "px-4 py-2 rounded-md font-semibold text-[#a65c1c] hover:bg-[#d7caac]",
              activeGame === "minimalMaximal" && "bg-[#a65c1c] text-white"
            )}
          >
            Minimal/Maximal
          </button>
          <button
            onClick={() => setActiveGame("upperLower")}
            className={clsx(
              "px-4 py-2 rounded-md font-semibold text-[#a65c1c] hover:bg-[#d7caac]",
              activeGame === "upperLower" && "bg-[#a65c1c] text-white"
            )}
          >
            Upper/Lower Bounds
          </button>
          <button
            onClick={() => setActiveGame("lattice")}
            className={clsx(
              "px-4 py-2 rounded-md font-semibold text-[#a65c1c] hover:bg-[#d7caac]",
              activeGame === "lattice" && "bg-[#a65c1c] text-white"
            )}
          >
            Lattice Visualizer
          </button>
        </div>

        {/* Game Content Container */}
        <div className="w-full flex justify-center">
          {activeGame === "minimalMaximal" && <MinimalMaximalGame />}
          {activeGame === "upperLower" && <UpperLowerBoundsGame />}
          {activeGame === "lattice" && <LatticeVisualizerGame />}
        </div>
      </div>
    </div>
  );
}
