import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { FiltroPaginacaoDto } from '../dtos/filtro-paginacao-dto'

export interface IGenericoService<S, R extends EntidadeDto> {
	findAll(): Promise<FiltroPaginacaoDto<R>>

	findById(id: number): Promise<R>

	save(data: S): Promise<R>

	update(id: number, data: S): Promise<R>

	delete(id: number): Promise<R>
}
