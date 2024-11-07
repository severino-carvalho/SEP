import { EntidadeDto } from '@/types/dtos/entidade.dto'

export interface UsuarioResDto extends EntidadeDto {
  nome: string
  email: string
  senha: string
}
