import { EntidadeDto } from "../../entidade.dto"

export interface LoginReqDto extends EntidadeDto {
	email: string
	senha: string
}
