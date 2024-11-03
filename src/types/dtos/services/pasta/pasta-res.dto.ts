import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { EncontroResDto } from '../encontro'

export interface PastaResDto extends EntidadeDto {
	equipe: string
	arquivo: string
	encontro: EncontroResDto
}
