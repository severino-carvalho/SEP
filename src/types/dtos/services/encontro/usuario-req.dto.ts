import { EntidadeDto } from '@/types/dtos/entidade.dto'

export interface UsuarioReqDto extends EntidadeDto {
  nome: string
  email: string
  senha: string
}
