import { SEPApiService } from '@/services/sep-api-service';
import { PastoralDto } from '@/types/dtos/services/equipista';
import { RotasApiEnum } from '@/types/enums/rotas-api-enum';

class PastoralService extends SEPApiService<PastoralDto, PastoralDto> { }

export const pastoralService = new PastoralService(RotasApiEnum.PASTORAL) 