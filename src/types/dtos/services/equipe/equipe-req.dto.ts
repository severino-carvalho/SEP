import { EntidadeDto } from "../../entidade.dto"

export interface EquipeReqDto extends Partial<EntidadeDto> {
	nome: string
	arquivo?: File
	encontroId: number
}
