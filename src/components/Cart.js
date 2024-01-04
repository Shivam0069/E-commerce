import React from "react";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { cartState, modalState } from "..";
import { MdMinimize } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
export default function Cart() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  };
  const carts = cartItems.filter((cart) => cart.count >= 1);

  const total = calculateTotalPrice();

  function addHandler(itemId) {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      )
    );
  }
  function subHandler(itemId) {
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId && cartItem.count > 0
          ? { ...cartItem, count: cartItem.count - 1 }
          : cartItem
      )
    );
  }

  console.log(cartItems);
  return (
    <div>
      {isOpen && (
        <Modal
          className="max-w-lg w-[90%] p-6 absolute top-16 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md overflow-y-scroll max-h-[80vh] scrollbar-none"
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
          }}
        >
          {carts.length > 0 ? (
            <ul className="flex flex-col">
              <div className="flex justify-between items-center font-bold mb-5">
                <p className="font-bold ml-2 flex-1">Product</p>
                <p className="mr-10">Quantity</p>
                <p>Price</p>
              </div>
              {carts.map((item) => {
                return (
                  <div
                    className="relative flex justify-between items-center mb-2"
                    key={item.id}
                  >
                    <img
                      className="h-20 w-20 rounded-md object-cover"
                      src={item.thumbnail}
                    />
                    <p className="font-bold absolute left-24 w-48 ">{item.title}</p>
                    <button
                      onClick={() => addHandler(item.id)}
                      className=" absolute right-14 border cursor-pointer font-bold px-1.5  hover:scale-105 bg-yellow-400 text-white m-auto "
                    >
                      +
                    </button>
                    <button
                      onClick={() => subHandler(item.id)}
                      className="absolute right-[120px] border cursor-pointer font-bold px-2  hover:scale-105 bg-yellow-400 text-white m-auto "
                    >
                      -
                    </button>
                    <p className=" font-semibold absolute right-24 ">
                      x{item.count}
                    </p>
                    <p className="font-semibold ">₹{item.price}</p>
                  </div>
                );
              })}
              <div className="font-bold text-end">Total : ₹{total}</div>
            </ul>
          ) : (
            <div className="text-center p-8 text-gray-600">
              <p className="text-4xl font-extrabold text-[#333333] mb-4">
                Your Cart is Empty
              </p>
              <p className="text-lg mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <p className="text-sm text-[#888888]">
                Explore our collection of amazing products and start filling up
                your cart!
              </p>
              <button
                className="mt-6 bg-[#E50914] text-white px-6 py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
                onClick={() => setIsOpen(false)}
              >
                Explore Products
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
