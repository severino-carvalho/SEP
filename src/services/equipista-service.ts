import { SEPApiService } from '@/services/sep-api-service';
import { EquipistaReqDto, EquipistaResDto } from '@/types/dtos/services/equipista';
import { RotasApiEnum } from '@/types/enums/rotas-api-enum';

class EquipistaService extends SEPApiService<EquipistaReqDto, EquipistaResDto> { }

export const equipistaService = new EquipistaService(RotasApiEnum.EQUIPISTA)
