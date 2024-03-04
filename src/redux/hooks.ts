import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TiposdeDatos, Rootstate } from "./store";

export const useAppDipatch = () => useDispatch<TiposdeDatos>()
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector