import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { EncontroResDto } from '../encontro'

export interface EquipeResDto extends EntidadeDto {
	equipe: string
	arquivoBase64?: string
	encontro: EncontroResDto
}
