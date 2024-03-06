
import Gallery from '@/components/Gallery/Gallery'
import Navbar from '@/components/Navbar/Navbar'
import React, { Fragment } from 'react'
import { getProductos } from './admin/api/getProductos'




export default async function page() {

  const datosProductos = await getProductos("https://backend-vercel-psi.vercel.app/productos")
  return (
    <Fragment>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Gallery datosProductos={datosProductos}   ></Gallery>
      </main>
    </Fragment>
  )
}
