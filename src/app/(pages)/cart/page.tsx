"use client";

import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai"; 
import { FiTrash } from "react-icons/fi"; 
import { useCart } from "@/components/(pages)/CardContext";

// Define CartItem type
interface CartItem {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  description?: string;
  size?: string;
}

export default function CartPage() {
  const { state, dispatch } = useCart();

  if (!state || !dispatch) {
    throw new Error("Cart context is not properly initialized.");
  }

  return (
    <div className="container mx-auto p-4 md:p-8 lg:px-24 lg:py-12 max-w-screen-2xl m-auto">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10">
        <div className="w-full md:w-3/5">
          <h1 className="text-2xl md:text-xl font-bold mb-6">Your Cart</h1>
          {state.items.length === 0 ? (
            <p className="text-lg">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {state.items.map((item:CartItem, i:number) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row items-center md:justify-between p-4 bg-white shadow rounded-lg"
                >
                  <div className="flex items-center gap-6">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      className="rounded-lg"
                      width={150}
                      height={150}
                      sizes="(max-width: 768px) 100px, 150px"
                    />
                    <div>
                      <h1 className="font-semibold text-xl md:text-lg">
                        {item.title}
                      </h1>
                      <h2 className="text-base md:text-sm text-gray-700 mt-1">
                        {item.description || "Product Description"}
                      </h2>
                      <div className="text-sm md:text-xs text-gray-600 mt-2">
                        <p>Size: {item.size || "N/A"}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="flex gap-4 mt-4 text-gray-800">
                        <AiOutlineHeart className="text-2xl cursor-pointer hover:text-red-500" />
                        <FiTrash
                          className="text-2xl cursor-pointer hover:text-gray-500"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: { _id: item._id },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-xl md:text-lg font-semibold mt-4 md:mt-0">
                    Price: ${item.price} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-center items-center gap-6 bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl md:text-xl font-bold mb-4">Summary</h1>
          <div className="w-full space-y-4">
            <div className="flex justify-between text-lg md:text-base">
              <span>Sub Total</span>
              <span>
                $
                {state.items
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-lg md:text-base">
              <span>Estimate Delivery & Handling</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-xl md:text-lg font-semibold">
              <span>Total</span>
              <span>
                $
                {state.items
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
          <button className="w-full text-lg md:text-base font-semibold text-white bg-cyan-500 rounded-full py-3 mt-6 hover:bg-cyan-600 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}