// src/lib/mappers/user.mapper.ts

import { EquipeReqDto, EquipeResDto } from "@/types/dtos/services/equipe";
import { PastaResDto } from "@/types/dtos/services/pasta/pasta-res.dto";

function transformarPasta(pasta?: PastaResDto): File {
  if (!pasta) return new File([], "")

  return new File([pasta.arquivo], pasta.nomeArquivo, { type: pasta.contentType })
}

export const equipeMapper = {
  to: (data: EquipeResDto): EquipeReqDto => ({
    id: data.id,
    equipe: data.equipe,
    arquivo: transformarPasta(data.pasta),
    encontroId: data.encontro.id
  })
};