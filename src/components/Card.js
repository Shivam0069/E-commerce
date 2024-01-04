import React from "react";
import { FcRating } from "react-icons/fc";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartState } from "..";

export default function Card({ item }) {
  const navigate = useNavigate();
  const discountedPrice = item.price;
  const discountPercentage = item.discountPercentage;
  const originalPrice = Math.floor(
    discountedPrice / (1 - discountPercentage / 100)
  );
  const [cart, setCart] = useRecoilState(cartState);

  const cartHandler = () => {
    const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingCartItem) {
      // If the item is already in the cart, update its count
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        )
      );
    } else {
      // If the item is not in the cart, add it with count = 1
      setCart((prevCart) => [...prevCart, { ...item, count: 1 }]);
    }
  };

  return (
    <div className="p-4 border rounded-md select-none shadow-md  group hover:shadow-lg transition-all duration-300">
      <img
        className="h-60 mx-auto object-cover item transition-all duration-500"
        src={item.images[0]}
        alt={item.title}
      />
      <div className="mt-4 font-semibold text-gray-800 group-hover:text-[#2874F0]">
        {item.title}
      </div>
      <div className="inline-block items-center bg-green-600 text-sm px-2 py-1 text-white mt-1 rounded-full hover:scale-105 transition-all duration-200">
        <div className="flex items-center">
          {item.rating} <FcRating className="ml-1" />
        </div>
      </div>
      <div className="mt-2 text-gray-600">
        <p className="truncate text-md">{item.description}</p>
      </div>
      <div className="mt-2">
        <p className="text-lg font-semibold text-black">₹{item.price}</p>
        <div className="flex items-center space-x-2 mt-1 text-gray-500">
          <div className="relative inline-block">
            <div className="text-sm line-through">{originalPrice}</div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-400" />
          </div>
          <p className="text-sm text-green-600">{discountPercentage}% off</p>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <button disabled className="disabled:cursor-not-allowed border bg-[#FB641B] disabled:bg-gray-500 px-4 py-2 rounded-md">Buy Now</button>
        <div
          onClick={cartHandler}
          className="border  rounded-md cursor-pointer inline-block px-4 py-2 bg-[#FF9F00] text-white font-semibold mt-3 hover:scale-105 transition-all duration-200"
        >
          <button className="flex items-center  space-x-2 focus:outline-none transform ">
            <IoCartOutline />
            <p>ADD TO CART</p>
          </button>
        </div>
      </div>
      {/* <div className="absolute top-4 right-4 bg-[#E50914] text-white font-bold p-1 rounded-full">
        New
      </div> */}
    </div>
  );
}
