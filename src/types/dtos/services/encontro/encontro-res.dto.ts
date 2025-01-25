import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { EquipeResDto } from '../equipe'

export interface EncontroResDto extends EntidadeDto {
	nome: string
	equipes: EquipeResDto[]
}
