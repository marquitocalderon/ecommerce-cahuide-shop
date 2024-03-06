"use client"
import useCookie from "@/utility/useCookie";
import { Fragment, useState } from "react";
import ModalPost from "./ModalPost";

interface Props {
  datos: any;
}

export default function Tabla({ datos }: Props) {
  const [openModal, setOpenModal] = useState(false);
  // Obtener token de las cookies del lado del cliente
  const tokenCookie = useCookie('token');
 
  return (
    <Fragment>
      <button onClick={() => setOpenModal(true)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">AGREGAR NUEVO PERFIL</button>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <div className="relative overflow-x-auto w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Perfil
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {datos.map((dato: any) => (
                  <tr key={dato.id_perfil}>
                    <td className="px-6 py-4">{dato.nombre_perfil}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${dato.estado_perfil ? "bg-green-500" : "bg-red-500"
                            } me-2`}
                        ></div>{" "}
                        {dato.estado_perfil ? "Activo" : "Inactivo"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        EDITAR
                      </button>
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        ELIMINAR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalPost openModal={openModal} setOpenModal={setOpenModal} tokenCookie={tokenCookie} />
    </Fragment>
  );
}
