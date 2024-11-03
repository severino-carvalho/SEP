import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { PastaResDto } from '../pasta'

export interface EncontroResDto extends EntidadeDto {
	nome: string
	pastas: PastaResDto[]
}
