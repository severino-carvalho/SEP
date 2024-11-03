import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { PastaReqDto } from '../pasta'

export interface EncontroReqDto extends Partial<EntidadeDto> {
	nome: string
	pastas: PastaReqDto[]
}
