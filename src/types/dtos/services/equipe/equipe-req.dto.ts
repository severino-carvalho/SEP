import { EntidadeDto } from "../../entidade.dto"

export interface EquipeReqDto extends Partial<EntidadeDto> {
	equipe: string
	arquivo?: File
	encontroId: number
}
