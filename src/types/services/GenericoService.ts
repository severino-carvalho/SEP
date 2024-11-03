import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { FiltroResult } from '@/types/services/FiltroResult'

export interface IGenericoService<S, R extends EntidadeDto> {
	findAll(): Promise<FiltroResult<R>>

	save(data: S): Promise<R>

	update(id: string, data: S): Promise<R>

	delete(id: string): Promise<R>
}
