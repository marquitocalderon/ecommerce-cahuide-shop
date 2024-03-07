import {createSlice} from "@reduxjs/toolkit"
import Cookies from "js-cookie";

interface EstadoInicial {
    contador: number;
}

const valorInicialDelEstado: EstadoInicial = {
    contador:  0,
};



export const counterSlice = createSlice({
    name: "contador",
    initialState: valorInicialDelEstado,
    reducers:{
        increment: (state) =>{
            state.contador = state.contador + 1
        },
        decrement: (state) =>{
            state.contador = state.contador - 1
        }
    }
})

export const {increment , decrement} =  counterSlice.actions

export default counterSlice.reducer