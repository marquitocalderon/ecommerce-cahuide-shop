"use client";
import { initFlowbite } from "flowbite";
import Cookies from "js-cookie";
import { JwtPayload, decode } from "jsonwebtoken";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import Aside from "./Aside";
import Colormenu from "./Colormenu";

interface DashboardProps {
  hijo: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ hijo }) => {
  useEffect(() => {
    initFlowbite();
    return () => {
      // Cleanup if necessary
    };
  }, []);

  const [username, setUsername] = useState<string>('');
  const [usernameimg, setUsernameimg] = useState<string>('');

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      const decodedToken = decode(token) as JwtPayload | null;
      if (decodedToken) {
        setUsername(decodedToken.username + " (" + decodedToken.role + ")");
        setUsernameimg(decodedToken.imagen);
      }
    }
  }, []);

  const handleLogout = () => {
    // Eliminar la cookie
    Cookies.remove('token');
    Cookies.remove('refreshToken');

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/login"
  };


  const [selectedColor, setSelectedColor] = useState("#6590D5");

  const handleColorChange = (color: string) => {
    console.log(color)
    setSelectedColor(color);
  };

  return (
    <Fragment>
      <nav className="fixed top-0 z-50 w-full bg-transparent dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/admin" className="flex ms-2 md:me-24">
                <img className="h-12 w-12 rounded-full bg-white" src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/000749_online_store_logos_design_free_online_E-commerce_cart_logo_maker-02.png" alt="" />
                <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white bg-gray-100 rounded text-black">E-<mark className="px-2 text-white bg-neutral-600 rounded dark:bg-blue-500">Commerce</mark></span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={usernameimg ? usernameimg : 'Cargando...'}
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {username ? username : 'Cargando...'}
                    </p>
                  </div>
                  <Colormenu onColorChange={handleColorChange} />
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        onClick={handleLogout}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Salir
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Aside selectedColor={selectedColor} />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 h-screen">

          {hijo}

        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
