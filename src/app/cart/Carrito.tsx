"use client";

import Navbar from "@/components/Navbar/Navbar";
import { initFlowbite } from "flowbite";
import { Fragment, useEffect, useState } from "react";

interface Producto {
  id_producto: number;
  nombre_producto: string;
  imagen: string;
  precio: number;
  cantidad: number
}

export default function Carrito() {
  const [cartProducts, setCartProducts] = useState<Producto[]>([]);
  const [subTotal, setsubTotal] = useState<number>(0);

  const [counter, setCounter] = useState<number>(0);

  // Step 1: Use useEffect to initialize the counter from localStorage
  useEffect(() => {
    initFlowbite();

    const initialCounter = localStorage.getItem("contador");
    setCounter(initialCounter ? parseInt(initialCounter) : 0);

    const storedProducts = localStorage.getItem("productos");
    setCartProducts(storedProducts ? JSON.parse(storedProducts) : []);

  }, []);
  //gracias a que ya lo tenias casi todo hecho solo hacia falta este segundo useEffect, lo quise hacer en el primero pero como ahi espera que cargue los productos entonces tengo que hacer un segundo usseEffect para poder tener datos llenos en el cardproducto.
  useEffect(() => {
    let subtotal = 0;
    cartProducts.forEach((producto) => {
      subtotal += producto.cantidad * producto.precio;
    });
    setsubTotal(subtotal);
  }, [cartProducts]);
  //-------------------------------------------------------------

  const incrementCantidad = (id_producto: number) => {
    const updatedCart = cartProducts.map((producto) =>
      producto.id_producto === id_producto
        ? { ...producto, cantidad: producto.cantidad + 1 }
        : producto
    );
    updateLocalStorage(updatedCart);
  };

  const decrementCantidad = (id_producto: number) => {
    const updatedCart = cartProducts.map((producto) =>
      producto.id_producto === id_producto && producto.cantidad > 1
        ? { ...producto, cantidad: producto.cantidad - 1 }
        : producto
    );
    updateLocalStorage(updatedCart);
  };


  const removeProductFromCart = (id_producto: number) => {
    const updatedCart = cartProducts.filter(
      (producto) => producto.id_producto !== id_producto
    );
    updateLocalStorage(updatedCart);
    const newCounter = counter - 1;
    setCounter(newCounter);
    localStorage.setItem("contador", newCounter.toString());
    window.location.reload()
  };

  const updateLocalStorage = (updatedCart: Producto[]) => {
    setCartProducts(updatedCart);
    localStorage.setItem("productos", JSON.stringify(updatedCart));
  };




  return (
    <Fragment>
      <Navbar></Navbar>
      <div className="relative p-6 bg-white border border-gray-200 overflow-x-auto shadow-md  sm:rounded-lg rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product0
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                SubTotal
              </th>
              <th scope="col" className="px-6 py-3">
                Accion
              </th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((producto: Producto) => (
              <tr
                key={producto.id_producto}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img src={producto.imagen} className="w-56" alt="" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {producto.nombre_producto}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementCantidad(producto.id_producto)}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        type="text"
                        id="first_product"
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1"
                        value={producto.cantidad}
                        required
                        readOnly
                      />
                    </div>
                    <button
                      onClick={() => incrementCantidad(producto.id_producto)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {`S/ ${producto.precio}`}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {`S/ ${producto.precio * producto.cantidad}`}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeProductFromCart(producto.id_producto)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
        <div className="grid gap-4 mb-4 grid-cols-3">
          <div className="col-span-1 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subtotal</label>
            <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="S/ 25.00" value={`S/ ${subTotal.toFixed(2)}`} disabled />
          </div>
          <div className="col-span-1 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
            <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="S/ 2999" value={`S/ ${subTotal.toFixed(2)}`} disabled />
          </div>
          <div className="col-span-3 sm:col-span-3 text-right">
            <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Pagar ahora</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
