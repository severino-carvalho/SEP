import { EntidadeDto } from "../../entidade.dto"

export interface UsuarioResDto extends EntidadeDto {
	nome: string
	email: string
	senha: string
}
