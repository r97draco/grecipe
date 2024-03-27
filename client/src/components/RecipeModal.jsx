import React, { useState } from "react";
import "./RecipeModal.css";

export default function RecipeModal({ recipe }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        View Recipe
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] overflow-auto">
            <div className="flex flex-col w-full border-0 rounded-lg">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-gray-200 custom-gradient">
                <h3 className="text-2xl font-semibold text-white">
                  {recipe.title}
                </h3>
                <button
                  className="text-white hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-auto p-6">
                <div className="mb-6">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="rounded-lg shadow-lg centered-image" // Apply centered-image class here
                  />
                </div>
                <div>
                  <strong className="text-lg">Used Ingredients:</strong>
                  <ul className="pl-5 list-disc">
                    {recipe.usedIngredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="my-2 flex items-center bg-gray-100 rounded-lg p-4"
                      >
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>{ingredient.original}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <strong className="text-lg">Missed Ingredients:</strong>
                  <ul className="pl-5 list-disc">
                    {recipe.missedIngredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="my-2 flex items-center bg-gray-100 rounded-lg p-4"
                      >
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>{ingredient.original}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {recipe.unusedIngredients && (
                  <div className="mt-6">
                    <strong className="text-lg">Unused Ingredients:</strong>
                    <ul className="pl-5 list-disc">
                      {recipe.unusedIngredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="my-2 flex items-center bg-gray-100 rounded-lg p-4"
                        >
                          <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <span>{ingredient.original}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
