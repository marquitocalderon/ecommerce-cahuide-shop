import axios from "axios";
import Swal from "sweetalert2";

export async function datosPost(url: any, data: any, headers: any) {
  Swal.fire({
    title: "Enviando datos...!",
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  try {
  
    // Verifica si el token es válido y contiene los datos necesarios
   
      // Utiliza el ID en la solicitud

      console.log(url);
      console.log(data);
      console.log(headers);

      // Realiza la solicitud POST
      const respuesta = await axios.post(url, data,  {headers} );
      // Esperar el tiempo restante antes de cerrar la primera alerta y mostrar la segunda
      console.log(respuesta);
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

  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        setTimeout(() => {
          // Cerrar la primera alerta
          Swal.close();
          // Mostrar segunda alerta de éxito
          Swal.fire({
            icon: "error",
            title: "ERROR EN EL SERVIDOR",
          });
        });
        //sal mrda me bugueas feooo
      } else if (error.response.data.statusCode === 400) {
        setTimeout(() => {
          // Cerrar la primera alerta
          Swal.close();
          // Mostrar segunda alerta de éxito
          Swal.fire({
            icon: "error",
            title: error.response?.data.message?.[0],
          });
        });
      } else if (error.response.data.statusCode === 409) {
        setTimeout(() => {
          // Cerrar la primera alerta
          Swal.close();
          // Mostrar segunda alerta de éxito
          Swal.fire({
            icon: "error",
            title: error.response?.data.message,
          });
        });
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
    }
    return error;
  }
}
