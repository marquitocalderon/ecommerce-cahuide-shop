import axios from "axios";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function datosGet(url: any) {
  try {
    // Obtiene la cookie del lado del cliente
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');

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

        const respuesta = await axios.get(url, { headers });

        const datosServidor = respuesta.data;
        return datosServidor;
      } else {
        console.error('Token JWT no válido o falta información');
        // Puedes manejar el caso en el que el token no sea válido aquí.
      }
    } else {
      console.error('Token no encontrado en la cookie');
      // Puedes manejar el caso en el que no se encuentre el token en la cookie aquí.
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
}
