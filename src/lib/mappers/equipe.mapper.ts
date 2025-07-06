// src/lib/mappers/user.mapper.ts

import { EquipeReqDto, EquipeResDto } from "@/types/dtos/services/equipe";

export const equipeMapper = {
  to: (data: EquipeResDto): EquipeReqDto => ({
    id: data.id,
    nome: data.nome,
    arquivo: undefined, // TODO: Implementar transformação do arquivo se necessário
    encontroId: data.encontro.id
  })
};