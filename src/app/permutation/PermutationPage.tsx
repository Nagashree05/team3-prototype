"use client";
import { useState } from "react";

export default function PermutationPage() {
  const [n, setN] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");

  const generatePermutations = (arr: number[]): string[] => {
    const permutations: string[] = [];

    const permute = (arr: number[], current: number[] = []) => {
      if (arr.length === 0) {
        permutations.push(
          `[${current
            .map((value) => `${value} → ${current[value - 1] ?? value}`)
            .join(", ")}]`
        );
        return;
      }
      for (let i = 0; i < arr.length; i++) {
        permute(
          [...arr.slice(0, i), ...arr.slice(i + 1)],
          [...current, arr[i]]
        );
      }
    };

    permute(arr);
    return permutations;
  };

  const handleGenerate = () => {
    if (n.trim() === "" || isNaN(Number(n)) || Number(n) <= 0) {
      setError("Please enter a valid positive integer for n.");
      setResult([]);
      return;
    }
    if (input.trim() === "") {
      setError("Please enter the numbers.");
      setResult([]);
      return;
    }

    setError("");
    const inputArray = input
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));

    if (inputArray.length !== Number(n)) {
      setError(`Please enter exactly ${n} numbers.`);
      setResult([]);
      return;
    }

    setResult(generatePermutations(inputArray));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#d4f8e2] p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Permutation Mappings in Discrete Math
        </h1>

        <div className="mb-4">
          <label className="text-gray-700">Enter the number of elements (n):</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            placeholder="Enter n"
            className="border p-2 w-full rounded-md mt-2 bg-gray-100 text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700">Enter the numbers (e.g., 1, 2, 3):</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter numbers separated by commas"
            className="border p-2 w-full rounded-md mt-2 bg-gray-100 text-gray-800"
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
        >
          Generate Permutations
        </button>

        {result.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-center text-gray-800">Permutations:</h2>
            <div
              className="bg-gray-800 p-3 rounded-md mt-4 max-h-80 overflow-y-auto"
              style={{ maxHeight: "300px", padding: "10px" }}
            >
              {result.map((perm, idx) => (
                <div key={idx} className="p-2 bg-gray-700 text-white mb-2 rounded-md shadow-sm">
                  {perm}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
