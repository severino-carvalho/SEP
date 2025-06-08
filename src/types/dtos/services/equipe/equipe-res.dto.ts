import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { EncontroResDto } from '../encontro'

export interface EquipeResDto extends EntidadeDto {
	fileName: string,
	fileType: string,
	fileData: unknown,
	nome: string,
	encontro: EncontroResDto,
}
