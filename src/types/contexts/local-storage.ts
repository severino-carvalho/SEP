import { UsuarioAutenticado } from "./usuario-autenticado"

export interface ILocalStorage {
  token: string
  usuario: UsuarioAutenticado
}