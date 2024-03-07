"use client"
import React, { Fragment, useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Login from "../login/Login";
import Cart from "../icons/Cart";
import Link from "next/link";
function Navbar() {


  const [contador, setContador] = useState(0);

  useEffect(() => {
    initFlowbite();

    // Obtener el valor del contador desde localStorage solo en el cliente
    if (typeof window !== "undefined") {
      const storedContador = localStorage.getItem("contador");
      setContador(storedContador ? parseInt(storedContador, 10) : 0);
    }

    return () => {
      // Cleanup if necessary
    };
  }, []);



  return (
    <Fragment>
  
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
           Ecommerce
          </span>
        </a>

        {/* CART */}
        <a className="relative cursor-pointer" href="/cart">
          <Cart></Cart>
          <span className="top-0 left-7 absolute w-8 h-8 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
              {contador ? contador : "0" }
            </span>
          </span>
        </a>


        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-black md:hover:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Hombres
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Mujeres
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Niños
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div className="max-lg:hidden">
          <button
            data-modal-target="popup-modal"
            data-modal-toggle="popup-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Login
          </button>

          <div
            id="popup-modal"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-700 bg-opacity-75"
            tabIndex={-1} // This should be a number
          >
            <div className="relative p-4 w-full max-w-[450px] max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-4">
                  <div className="flex flex-col gap-3 mb-4">
                    <p>
                      Realiza pedidos sin gastos de envío, consigue códigos
                      descuento y productos exclusivos en Cahuide Shop.
                    </p>
                    <p>
                      <strong>Inicia sesión o regístrate. ¡Es gratis!</strong>
                    </p>
                  </div>
                  <Login></Login>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </Fragment>
  );
}

export default Navbar;
