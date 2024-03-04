
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { datosGet } from "../api/get";
import Tabla from "./components/Tabla";

export default async function page() {
  const url = "https://backend-vercel-psi.vercel.app/perfiles";
  const datos = await datosGet(url);
  return (
    <Fragment>
     <Tabla datos={datos}></Tabla>
    </Fragment>
  );
}
