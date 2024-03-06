"use client";
import React, { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Google from "../Botones/Google";
import Facebook from "../Botones/Facebook";

const Login = () => {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usuarioError, setUsuarioError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reiniciar mensajes de error
    setUsuarioError("");
    setPasswordError("");

    // Validar longitud del usuario y la contraseña
    if (usuario.length < 4 || usuario.length > 16) {
      setUsuarioError("El usuario debe tener entre 4 y 16 caracteres.");
      return;
    }

    if (password.length < 4 || password.length > 16) {
      setPasswordError("La contraseña debe tener entre 4 y 16 caracteres.");
      return;
    }

    try {
      const respuesta = await axios.post(
        "https://backend-vercel-psi.vercel.app/auth/loginclientes",
        {
          usuario,
          password,
        }
      );

      Cookies.set("token", respuesta.data.token);


      window.location.href= "/"
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <Fragment>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="usuario"
            className="block mb-2 text-sm  text-gray-900 dark:text-white font-bold"
          >
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tu Usuario"
            required
          />
          {usuarioError && (
            <p className="text-red-500 text-sm mt-1">{usuarioError}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Tu Password"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div className=" flex justify-center items-center gap-5">
      <button type="submit" className="px-4 py-2 bg-blue-900 hover:bg-blue-400 text-white">
        Ingresar
      </button>
        <a href="/registrar" className="px-4 py-2  bg-zinc-600 hover:bg-slate-700 text-white">Registrarse</a>
        </div>
      </form>
      <div className="max-w-full mt-3">
            <Google></Google>
      </div>
      <div className="max-w-full mt-3">
            <Facebook></Facebook>
      </div>
      </Fragment>
  );
};

export default Login;
