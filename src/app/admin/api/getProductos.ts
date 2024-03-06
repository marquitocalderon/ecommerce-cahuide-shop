import axios from "axios";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function getProductos(url: any) {
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
        cookieStore.delete('token')
        window.location.href = "/"

      }
    } else {
        const respuesta = await axios.get(url);

        const datosServidor = respuesta.data;
        return datosServidor;
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
}
