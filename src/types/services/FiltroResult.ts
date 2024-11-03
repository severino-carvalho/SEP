import { EntidadeDto } from '@/types/dtos/entidade.dto'

export interface FiltroResult<T extends EntidadeDto> {
	dados: T[]
	total: number
}
