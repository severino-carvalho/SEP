import { EntidadeDto } from '@/types/dtos/entidade.dto'

export interface EncontroReqDto extends Partial<EntidadeDto> {
	nome: string
}
