import { SEPApiService } from '@/services/sep-api-service'
import { EncontroReqDto, EncontroResDto } from '@/types/dtos/services/encontro'
import { RotasApiEnum } from '@/types/enums/rotas-api-enum'

class EncontroService extends SEPApiService<EncontroReqDto, EncontroResDto> { }

export const encontroService = new EncontroService(RotasApiEnum.ENCONTROS)
