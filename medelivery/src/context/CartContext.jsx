import { useEffect, useState } from "react";
import { CartContext } from "./CartContext.js";

export function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("medelivery-cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "medelivery-cart",
            JSON.stringify(cart)
        );
    }, [cart]);


    const addToCart = (medicine) => {

        setCart((currentCart) => {

            const existingItem = currentCart.find(
                (item) => item.id === medicine.id
            );

            if (existingItem) {
                return currentCart.map((item) =>
                    item.id === medicine.id
                        ? {
                              ...item,
                              quantity: Math.min(
                                  item.quantity + 1,
                                  item.stock
                              )
                          }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    ...medicine,
                    quantity: 1
                }
            ];
        });
    };


    const increaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: Math.min(
                              item.quantity + 1,
                              item.stock
                          )
                      }
                    : item
            )
        );
    };


    const decreaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              quantity: item.quantity - 1
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };


    const removeFromCart = (id) => {

        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.id !== id
            )
        );
    };


    const clearCart = () => {
        setCart([]);
    };


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    const cartCount = cart.reduce(
        (count, item) =>
            count + item.quantity,
        0
    );


    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                total,
                cartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
}