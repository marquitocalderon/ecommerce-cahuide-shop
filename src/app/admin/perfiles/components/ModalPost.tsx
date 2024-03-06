"use client"
import { Button, Modal } from "flowbite-react";
import { datosPost } from "../../api/post";

interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  tokenCookie: any
}

export default function ModalPost({ openModal, setOpenModal, tokenCookie }: Props) {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.toUpperCase();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDatos = new FormData(e.target);
    const enviarDatos = {
      nombre_perfil: formDatos.get("nombre_perfil"),
    };
    const headers = {
      Authorization: `Bearer ${tokenCookie}`,
    };

    datosPost("https://backend-vercel-psi.vercel.app/perfiles",enviarDatos, headers);
    console.log(enviarDatos, enviarDatos, tokenCookie);
  }
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Nuevo Perfil</Modal.Header>
      <form className="mx-10" onSubmit={handleSubmit}>
        <Modal.Body>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Perfil</label>
          <input type="text" name="nombre_perfil" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CAJERO" onChange={handleInputChange} required />
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
