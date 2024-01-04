import React, { useEffect, useState } from "react";
import Card from "./Card";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRecoilState } from "recoil";
import { filterState } from "..";
AOS.init();

export default function Cards({ items, isLoading }) {
  const [selectedOption, setSelectedOption] = useRecoilState(filterState);

  const handleFilterChange = (min, max) => {
    setSelectedOption({ min, max });
  };

  const applyPriceFilter = (item, min, max) => {
    const itemPrice = item.price;
    return itemPrice >= min && itemPrice <= max;
  };

  const filteredItems = items.filter((item) => {
    if (!selectedOption) {
      return true;
    }

    const { min, max } = selectedOption;
    return applyPriceFilter(item, min, max);
  });

  return (
    <div className="flex">
      <div className="hidden lg:inline-flex w-1/4 p-4 md:flex-col ">
        <p className="text-lg font-bold mb-2">Price Filters</p>
        <label className="mb-2 lg:flex">
          <input
            type="radio"
            name="priceFilter"
            checked={!selectedOption}
            onChange={() => setSelectedOption(null)}
            className="mr-2"
          />
          <p className="font-semibold">All</p>
        </label>
        <label className="mb-2 lg:flex">
          <input
            type="radio"
            name="priceFilter"
            onChange={() => handleFilterChange(0, 100)}
            className="mr-2 "
          />
          <p className="font-semibold">0-100</p>
        </label>
        <label className="mb-2 lg:flex">
          <input
            type="radio"
            name="priceFilter"
            onChange={() => handleFilterChange(100, 500)}
            className="mr-2 "
          />
          <p className="font-semibold">100-500</p>
        </label>
        <label className="mb-2 lg:flex">
          <input
            type="radio"
            name="priceFilter"
            onChange={() => handleFilterChange(500, 1000)}
            className="mr-2 "
          />
          <p className="font-semibold">500-1000</p>
        </label>
        <label className="mb-2 lg:flex">
          <input
            type="radio"
            name="priceFilter"
            onChange={() => handleFilterChange(1000, Infinity)}
            className="mr-2 "
          />
          <p className="font-semibold">1000-above</p>
        </label>
      </div>
      <div className="flex-grow p-4 bg-white mr-5">
        {filteredItems.length === 0 && !isLoading ? (
          <div className="text-start mt-4  ">
            <p className="text-lg font-bold text-[#333333] mb-2">
              No Products Found
            </p>
            <p className="text-gray-600">
              Sorry, no products match your selected filters. Please try
              different filter options or explore our entire collection.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:bg-[#374151]">
            {isLoading ? (
              <div className="pt-10 mx-2 lg:pl-52 max-w-6xl flex sm:space-x-4 flex-col space-x-20 sm:flex-row pb-42">
                <div className="animate-pulse">
                  <div className="h-60 w-60 mb-4 bg-gray-200 rounded-md"></div>
                  <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
                  <div className="h-2 w-44 mb-2.5 bg-gray-200 rounded-md"></div>
                </div>
                <div className="hidden sm:inline-flex sm:space-x-4">
                  <div className="animate-pulse">
                    <div className="h-60 w-60 mb-4 bg-gray-200 rounded-md"></div>
                    <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
                    <div className="h-2 w-44 mb-2.5 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-60 w-60 mb-4 bg-gray-200 rounded-md"></div>
                    <div className="h-2 w-48 mb-2.5 bg-gray-200 rounded-md"></div>
                    <div className="h-2 w-44 mb-2.5 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              </div>
            ) : (
              filteredItems?.map((item) => (
                <li
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-duration="800"
                >
                  <Card item={item} />
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
