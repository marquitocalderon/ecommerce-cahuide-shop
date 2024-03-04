import {createSlice} from "@reduxjs/toolkit"

const valorInicialdelEstado = {
    contador: 0
}


export const counterSlice = createSlice({
    name: "contador",
    initialState: valorInicialdelEstado,
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