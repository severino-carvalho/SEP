import { EntidadeDto } from "../../entidade.dto"
import { EncontroReqDto } from "../encontro"

export interface PastaReqDto extends EntidadeDto {
	equipe: string
	arquivo: string
	encontro: EncontroReqDto
}
