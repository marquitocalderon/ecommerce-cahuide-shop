"use client";
import React, { useState } from "react";
import ubigeosData from "../../components/ubigeo.json";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function Registrarse() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Nuevo estado
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado

  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("");

  const [cambiarBoton, setCambiarBoton] = useState(false);

  const departamentos = Array.from(
    new Set(
      ubigeosData
        .filter(
          (ubigeo) => ubigeo.provincia === "00" && ubigeo.distrito === "00"
        )
        .map((ubigeo) => ({
          codigo: ubigeo.departamento,
          nombre: ubigeo.nombre,
        }))
    )
  );

  const provincias = Array.from(
    new Set(
      ubigeosData
        .filter(
          (ubigeo) =>
            ubigeo.departamento === selectedDepartamento &&
            ubigeo.provincia !== "00" && // Make sure to exclude '00' for provincia
            ubigeo.distrito === "00" // Exclude distritos
        )
        .map((ubigeo) => ({
          codigo: ubigeo.provincia,
          nombre: ubigeo.nombre,
        }))
    )
  );

  const distritos = Array.from(
    new Set(
      ubigeosData
        .filter(
          (ubigeo) =>
            ubigeo.departamento === selectedDepartamento &&
            ubigeo.provincia === selectedProvincia &&
            ubigeo.distrito !== "00" // Exclude "00" for distrito
        )
        .map((ubigeo) => ({
          codigo: ubigeo.distrito,
          nombre: ubigeo.nombre,
        }))
    )
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    // Validar y actualizar el estado de coincidencia de contraseñas
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    // Validar y actualizar el estado de coincidencia de contraseñas
    setPasswordsMatch(e.target.value === password);
  };

  // desde aca mejor dicho  trabajarias desde la linea 82
  // priero has un registro normal , de ahi has con repetir dni , reptir gmail, repetir usuario

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setCambiarBoton(true);

    const formDatos = new FormData(e.target);

    // Validar si las contraseñas coinciden
    if (password === confirmPassword) {
      // Restablecer el mensaje de error

      const departamentoNombre = departamentos.find(
        (dep) => dep.codigo === selectedDepartamento
      )?.nombre;
      const provinciaNombre = provincias.find(
        (prov) => prov.codigo === selectedProvincia
      )?.nombre;
      const distritoNombre = distritos.find(
        (dist) => dist.codigo === selectedDistrito
      )?.nombre;

      const enviarDatos = {
        nombre_completo: formDatos.get("nombre_completo"),
        email: formDatos.get("correo"),
        dni: formDatos.get("dni"),
        departamento: departamentoNombre,
        provincia: provinciaNombre,
        distrito: distritoNombre,
        usuario: formDatos.get("usuario"),
        password: confirmPassword,
      };

      // Mostrar la primera alerta al iniciar la función
      Swal.fire({
        title: "Enviando datos...!",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await axios.post(
          "https://backend-vercel-psi.vercel.app/clientes",
          enviarDatos
        );
        console.log(response.data); // Puedes hacer algo con la respuesta si lo deseas

        // Esperar el tiempo restante antes de cerrar la primera alerta y mostrar la segunda
        setTimeout(() => {
          // Cerrar la primera alerta
          Swal.close();
          // Mostrar segunda alerta de éxito
          Swal.fire({
            icon: "success",
            title: "Registro exitoso!",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            // Esperar 2 segundos antes de recargar la página
              window.location.reload();
          });
        });
      } catch (error: any) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setTimeout(() => {
              // Cerrar la primera alerta
              Swal.close();
              // Mostrar segunda alerta de éxito
              Swal.fire({
                icon: "error",
                title: ("ERROR EN EL SERVIDOR"),
              });
            });
            setErrorMessage("ERROR EN EL SERVIDOR");
            setCambiarBoton(false); //sal mrda me bugueas feooo
          } else if (error.response.data.statusCode === 400) {
            setTimeout(() => {
              // Cerrar la primera alerta
              Swal.close();
              // Mostrar segunda alerta de éxito
              Swal.fire({
                icon: "error",
                title: error.response.data.message[0],
              });
            });
            setErrorMessage(error.response.data.message[0]);
            setCambiarBoton(false);
          } else if (error.response.data.statusCode === 409) {
            setTimeout(() => {
              // Cerrar la primera alerta
              Swal.close();
              // Mostrar segunda alerta de éxito
              Swal.fire({
                icon: "error",
                title: error.response.data.message,
              });
            });
            setErrorMessage(error.response.data.message[0]);
            setCambiarBoton(false);
          } else {
            setTimeout(() => {
              // Cerrar la primera alerta
              Swal.close();
              // Mostrar segunda alerta de éxito
              Swal.fire({
                icon: "error",
                title: "ERROR DE ENVÍO DE DATOS",
              });
            });
            setErrorMessage("ERROR DE ENVÍO DE DATOS");
            setCambiarBoton(false);
          }
        } else {
          setTimeout(() => {
            // Cerrar la primera alerta
            Swal.close();
            // Mostrar segunda alerta de éxito
            Swal.fire({
              icon: "error",
              title: "ERROR",
            });
          });
          setErrorMessage("ERROR");
          setCambiarBoton(false);
        }
      }
    } else {
      setTimeout(() => {
        // Cerrar la primera alerta
        Swal.close();
        // Mostrar segunda alerta de éxito
        Swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.",
        });
      });
      // Mostrar mensaje de error y actualizar el estado
      setErrorMessage(
        "Las contraseñas no coinciden. Por favor, inténtalo de nuevo."
      );
      setCambiarBoton(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white overflow-hidden">
      <div className="w-1/2  h-full">
        <div className="flex justify-center items-center h-screen">
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z"
              fill="#050D42"
            />
            <path
              d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z"
              fill="#050D42"
            />
            <path
              d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z"
              fill="#050D42"
            />
            <path
              d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z"
              fill="#2F4BFF"
            />
          </svg>
        </div>
      </div>

      <div className="w-1/2">
        <form
          className="flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-6 gap-4 px-4">
            <div className="col-span-6">
              <h2 className="text-3xl font-bold mb-3">Registrarse</h2>
            </div>
            <div className="mb-4 col-span-3">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre Completo:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre Completo"
                name="nombre_completo"
                required
              />
            </div>

            <div className="mb-4 col-span-3">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Usuario:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Usuario"
                name="usuario"
                required
              />
            </div>

            <div className="mb-4 col-span-3 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contraseña:
              </label>
              <div className="flex items-center">
                <input
                  required
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 ${
                    !passwordsMatch && "border-red-500"
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div
                  className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z"
                        ></path>
                      </>
                    )}
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4 col-span-3 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirmar Contraseña:
              </label>
              <div className="flex items-center">
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 ${
                    !passwordsMatch && "border-red-500"
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z"
                        ></path>
                      </>
                    )}
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4 col-span-3">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                DNI:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Escriba su DNI"
                name="dni"
                required
              />
            </div>

            <div className="mb-4 col-span-3">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Departamento:
              </label>
              <select
                value={selectedDepartamento}
                onChange={(e) => {
                  const seleccionarDepartamento = e.target.value;
                  setSelectedDepartamento(seleccionarDepartamento);
                  setSelectedProvincia("");
                  setSelectedDistrito("");
                }}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Selecciona un departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.codigo} value={departamento.codigo}>
                    {departamento.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 col-span-3">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Provincia:
              </label>
              <select
                value={selectedProvincia}
                onChange={(e) => {
                  setSelectedProvincia(e.target.value);
                  setSelectedDistrito("");
                }}
                disabled={!selectedDepartamento}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Selecciona una Provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.codigo} value={provincia.codigo}>
                    {provincia.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 col-span-3">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Distrito:
              </label>
              <select
                value={selectedDistrito}
                onChange={(e) => setSelectedDistrito(e.target.value)}
                disabled={!selectedProvincia}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Selecciona un Distrito</option>
                {distritos.map((distrito) => (
                  <option key={distrito.codigo} value={distrito.codigo}>
                    {distrito.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 col-span-4">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Correo Electronico:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Correo Electronico"
                name="correo"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                -
              </label>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {cambiarBoton ? "Registrando" : "Registrarse"}
              </button>
            </div>

            <div className="mb-4 col-span-6">
              {/* <p className="text-red-500 text-xl font-bold mb-4">
                {errorMessage}
              </p> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
