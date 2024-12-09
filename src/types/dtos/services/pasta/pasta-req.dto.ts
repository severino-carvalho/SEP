import { EntidadeDto } from "../../entidade.dto"

export interface PastaReqDto extends Partial<EntidadeDto> {
	equipe: string
	arquivoBase64?: string
	encontroId: number
}
