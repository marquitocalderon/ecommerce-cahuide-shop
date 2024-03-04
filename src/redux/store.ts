import counterReducer from "./estados_globales/contador";
import {configureStore  } from "@reduxjs/toolkit";
import productoReducer from "./estados_globales/productos";

export const store = configureStore({
    reducer:{
        counterReducer,
        productos: productoReducer
    }
})

export type Rootstate = ReturnType<typeof store.getState>
export type TiposdeDatos = typeof store.dispatch