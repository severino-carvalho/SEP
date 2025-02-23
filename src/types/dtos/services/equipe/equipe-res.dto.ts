import { EntidadeDto } from '@/types/dtos/entidade.dto'
import { EncontroResDto } from '../encontro'
import { PastaResDto } from '../pasta/pasta-res.dto'

export interface EquipeResDto extends EntidadeDto {
	equipe: string
	pasta?: PastaResDto
	encontro: EncontroResDto
}

/**
 *
  {
		"id": 2,
		"equipe": "Equipe Segue-me",
		"encontro": {
				"id": 2,
				"nome": "Encontro de Jovens com Cristo"
		}
}
 */
