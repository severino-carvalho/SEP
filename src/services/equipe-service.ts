import { SEPApiService } from '@/services/sep-api-service';
import { EquipeReqDto, EquipeResDto } from '@/types/dtos/services/equipe';
import { RotasApiEnum } from '@/types/enums/rotas-api-enum';

class EquipeService extends SEPApiService<EquipeReqDto, EquipeResDto> { }

export const equipeService = new EquipeService(RotasApiEnum.EQUIPE)