import { EntidadeDto } from "../../entidade.dto"

export interface PastaResDto extends EntidadeDto {
  nomeArquivo: string,
  contentType: string
  arquivo: string
}