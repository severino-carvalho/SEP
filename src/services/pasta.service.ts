import { SEPApiService } from '@/services/sep-api.service'
import { PastaReqDto, PastaResDto } from '@/types/dtos/services/pasta'
import { RotasApiEnum } from '@/types/enums/rotas-api-enum'

class PastaService extends SEPApiService<PastaReqDto, PastaResDto> { }

export const pastaService = new PastaService(RotasApiEnum.PASTAS)
