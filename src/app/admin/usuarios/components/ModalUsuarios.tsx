"use client"
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { datosPost } from "../../api/post";
import Ojoabierto from "../icons/Ojoabierto";
import Ojocerrado from "../icons/Ojocerrado";

interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  tokenCookie: any;
  perfiles: any
}

export default function ModalUsuarios({ openModal, setOpenModal, tokenCookie, perfiles }: Props) {

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessage2, setErrorMessage2] = useState<string>("");
  const [errorpassword, setErrorpassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDatos = new FormData(e.target);
    // Validar si el campo de archivo está vacío
    if (!imageFile) {
      setErrorMessage("Por favor selecciona una imagen");
      return; // Detener la submisión del formulario si el campo de archivo está vacío
    }
    else if (!formDatos.get("idperfil")) {
      setErrorMessage2("Por favor selecciona un perfil");
      return; // Detener la submisión del formulario si el campo de archivo está vacío
    }

    // Validar si las contraseñas coinciden
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("password2") as HTMLInputElement;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      setErrorpassword("Las contraseñas no coinciden");
      return; // Detener la submisión del formulario si las contraseñas no coinciden
    }
    const headers = {
      Authorization: `Bearer ${tokenCookie}`,
      'Content-Type': 'multipart/form-data'
    };
    datosPost("https://backend-vercel-psi.vercel.app/usuarios", formDatos, headers);

  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size <= 4 * 1024 * 1024) {
        // File size is less than or equal to 5MB
        setImageFile(file);
        setErrorMessage(""); // Clear any previous error message
      } else {
        // File size exceeds 5MB, show error message
        setErrorMessage("La imagen no debe superar los 5MB");
        event.target.value = ""; // Clear the input field
        setImageFile(null);
      }
    }
  };
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Nuevo Usuario</Modal.Header>
      <form className="mx-10" onSubmit={handleSubmit}>
        <Modal.Body>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
          <input type="text" name="usuario" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="lucia07"required />

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" id="password" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}> {showPassword ? <Ojoabierto /> : <Ojocerrado />}</div>
          </div>
          {errorpassword && (
            <div className="mt-1 text-sm text-red-500 dark:text-red-300 text-right" id="user_avatar_help">
              {errorpassword}
            </div>
          )}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="password2" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}> {showPassword ? <Ojoabierto /> : <Ojocerrado />}</div>
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen</label>
          <input name="imagen" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" aria-describedby="user_avatar_help" type="file" accept="image/*" onChange={handleFileChange} />
          {errorMessage && (
            <div className="mt-1 text-sm text-red-500 dark:text-red-300 text-right" id="user_avatar_help">
              {errorMessage}
            </div>
          )}

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
          <select name="idperfil" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Elija un pefil para el usuario</option>
            {perfiles.map((dato: any) => (
              <option key={dato.id_perfil} value={dato.id_perfil}>{dato.nombre_perfil}</option>
            ))}
          </select>
          {errorMessage2 && (
            <div className="mt-1 text-sm text-red-500 dark:text-red-300 text-right" id="user_avatar_help">
              {errorMessage2}
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
