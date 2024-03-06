
import { Fragment } from "react";
import { datosGet } from "../api/get";
import TablaUsuarios from "./components/TablaUsuarios";

export default async function page() {
  const url = "https://backend-vercel-psi.vercel.app/usuarios";
  const usuarios = await datosGet(url);
  const url2 = "https://backend-vercel-psi.vercel.app/perfiles";
  const perfiles = await datosGet(url2);
  return (
    <Fragment>
     <TablaUsuarios usuarios={usuarios} perfiles={perfiles}></TablaUsuarios>
    </Fragment>
  );
}
