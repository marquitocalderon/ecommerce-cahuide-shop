import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function datosPost(url: any, data: any) {
  try {
    // Obtiene la cookie del lado del cliente
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token");

    // Verifica si la cookie y el valor del token existen
    if (tokenCookie && tokenCookie.value) {
      const token = tokenCookie.value;

      // Decodifica el token JWT para obtener los datos
      const tokenData = jwt.decode(token) as JwtPayload;

      // Verifica si el token es válido y contiene los datos necesarios
      if (tokenData) {
        // Utiliza el ID en la solicitud
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Realiza la solicitud POST
        const respuesta = await axios.post(url, data, { headers });

        // Si la solicitud fue exitosa, retorna true
        return true;
      } else {
        console.error("Token JWT no válido o falta información");
        // Puedes manejar el caso en el que el token no sea válido aquí.
        return false;
      }
    } else {
      console.error("Token no encontrado en la cookie");
      // Puedes manejar el caso en el que no se encuentre el token en la cookie aquí.
      return false;
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    // Si hay un error, retorna ese error
    return error;
  }
}
