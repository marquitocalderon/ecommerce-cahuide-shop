import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id_producto: number; 
  nombre_producto: string;
  image: string;
  precio: number
}

interface CounterState {
  products: Product[];
}

const valorProductos: CounterState = {
  products: [],
};

export const productoSlice = createSlice({
  name: "productos",
  initialState: valorProductos,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // Agregar un producto al array de productos
      state.products.push(action.payload);
    },
    // Otros reducers pueden ir aquí
  },
});


export const { addProduct } = productoSlice.actions;

// Exporta el reducer generado automáticamente por createSlice
export default productoSlice.reducer;
