"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Producto {
  id_producto: number;
  nombre_producto: string;
  imagen: string;
  precio: number;
}


export default function Gallery({ datosProductos }: { datosProductos: any }) {

  const [counter, setCounter] = useState<number>(0);

  const [cartProducts, setCartProducts] = useState<Producto[]>([]);

  // Step 1: Use useEffect to initialize the counter from localStorage
  useEffect(() => {
    const initialCounter = localStorage.getItem("contador");
    setCounter(initialCounter ? parseInt(initialCounter) : 0);

    const storedProducts = localStorage.getItem("productos");
    setCartProducts(storedProducts ? JSON.parse(storedProducts) : []);
  }, []); // The empty dependency array ensures that this effect runs only once on mount



  const addToCart = (producto: Producto) => {
    const { id_producto, nombre_producto, imagen, precio } = producto;
  
    // Check if the product with the same ID already exists in the cart
    const isProductAlreadyInCart = cartProducts.some((item) => item.id_producto === id_producto);
  
    if (isProductAlreadyInCart) {
      // Display an alert if the product with the same ID is already in the cart
      alert("Este producto ya está en el carrito");
    } else {
      // Add the new product to the cart if it doesn't exist
      const newProduct = { id_producto, nombre_producto, imagen, precio , cantidad: 1 };
      const newCart = [...cartProducts, newProduct];
      setCartProducts(newCart);
      localStorage.setItem("productos", JSON.stringify(newCart));
  
      // Increment the counter only if the product is added successfully
      const newCounter = counter + 1;
      setCounter(newCounter);
      localStorage.setItem("contador", newCounter.toString());
      window.location.reload();
    }
  };
  
  





  return (
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-lg:px-4 px-28 mt-10">

    {datosProductos.map((producto: any) => (
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-lg:col-span-2" key={producto.id_producto}>
        <a href="#">
          <Image src={producto.imagen} alt="" width={385} height={200} ></Image>
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
             {producto.nombre_producto}
            </h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              S/{producto.precio}
            </span>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                addToCart(producto);}}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
         ))}
    </div>
  );
}
