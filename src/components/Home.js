import React, { useEffect, useRef, useState } from "react";
import Cards from "./Cards";

import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { cartState, filterState, modalState } from "..";
import { useRecoilState } from "recoil";
import Cart from "./Cart";
const getUserDetails = () => {
  const userDetailsString = localStorage.getItem("userDetails");
  return userDetailsString ? JSON.parse(userDetailsString) : null;
};

export default function Home() {
  const [selectedOption, setSelectedOption] = useRecoilState(filterState);
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const suggestionsData = allItems
    .filter((item) => item.title)
    .map((item) => item.title);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [cart, setCart] = useRecoilState(cartState);
  const carts = cart.filter((cart) => cart.count >= 1);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();
  const data = getUserDetails();
  console.log(data);

  const showSuggestions = (value) => {
    if (suggestionsData.length === 0) {
      return;
    }
    const filteredSuggestions = suggestionsData?.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    const limitedSuggestions = filteredSuggestions.slice(0, 5);

    setSuggestions(limitedSuggestions);
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    inputRef.current.value = suggestion;
    setSuggestions([]);
    handleSearch();
  };

  function logOutHandler() {
    localStorage.removeItem("userDetails");
    setCart([]);
    navigate("/in");
  }

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.products);
        setAllItems(data.products);
        setIsLoading(false); // Move this line inside the .then block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  function handleSearch() {
    setIsLoading(true);
    setSelectedOption(null);
    const search = inputRef.current.value.toLowerCase();
    const filteredItems = allItems.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
    setItems(filteredItems);
    setIsLoading(false);
  }
  return (
    <div className=" bg-gray-100 min-h-screen py-5">
      <div className="max-w-6xl ml-10 sm:ml-20 md:ml-32 lg:ml-44 flex justify-between items-center mb-5">
        <img
          className="hover:scale-105 transition-all duration-200 cursor-pointer"
          onClick={() => {
            inputRef.current.value = "";
            handleSearch();
          }}
          src="https://internshala-uploads.internshala.com/logo%2F606b4622321611617643042.png.webp"
          alt="Logo"
        />
        <div className="hidden lg:flex items-center border rounded-md bg-[#F0F5FF] text-[#666666] px-4 py-2 w-96 space-x-2">
          <GoSearch />
          <input
            ref={inputRef}
            className="bg-[#F0F5FF] flex-1 focus:outline-none"
            placeholder="Search For Products, Brands and More"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              showSuggestions(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {searchTerm && (
            <div className="absolute top-16 mt-2 left-[510px] w-96 z-1 bg-white border border-gray-300 rounded-md shadow-md">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex font-semibold items-center text-md border rounded-md shadow-md px-4 py-2 space-x-2 bg-[#FF9F00] text-white cursor-pointer hover:scale-105"
          >
            <IoCartOutline className="font-semibold" />
            <p>Cart</p>
            {carts.length > 0 && <p>{carts.length}</p>}
          </button>
          <div onClick={logOutHandler} className="hover:scale-110">
            <img
              className="h-10 w-10 rounded-full border object-cover cursor-pointer"
              src={data?.image}
              alt="User Avatar"
            />
          </div>
        </div>
      </div>

      {items.length === 0 && !isLoading ? (
        <div className="text-center mt-16">
          <p className="text-3xl font-bold text-[#333333] mb-4">
            No Products Found
          </p>
          <p className="text-gray-600 text-lg">
            Sorry, we couldn't find any products matching your search term.
            Please try a different search or explore our collection for amazing
            products.
          </p>
          <button
            onClick={() => {
              setItems(allItems);
              inputRef.current.value = "";
            }}
            className="bg-[#E50914] text-white px-6 py-2 mt-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <Cards items={items} isLoading={isLoading} />
      )}

      <Cart />
    </div>
  );
}
