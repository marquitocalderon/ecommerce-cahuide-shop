import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request: any) {
  const token = request.cookies.get('token');

  


  if (token === undefined) {
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    try {
      // Decodificar la clave secreta desde Base64
      const clave = "marquinho1701";
      const tokenvalor = token.value
    
      // Utilizar jwtVerify para verificar el token
      const resultado = await jwtVerify(tokenvalor, new TextEncoder().encode(clave));

      // Verificar el rol del usuario en el payload
      const { role } = resultado.payload as any;

   
      // Verificar el rol y redirigir según sea necesario
      if (role.includes('ADMIN') && request.nextUrl.pathname.includes('/admin')) {
        return NextResponse.next();
      } else if (role.includes('USUARIO') && request.nextUrl.pathname.includes('/usuario')) {
        return NextResponse.next();
      } else if (role.includes('CLIENTE') && request.nextUrl.pathname.includes('/')) {
        return NextResponse.redirect(new URL('/', request.url));
      } else {
        // Si el rol no es adecuado, redirigir a la página principal
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}


export const config = {
  matcher: ['/admin/:path*', '/usuario/:path*']
};