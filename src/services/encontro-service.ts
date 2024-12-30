import { SEPApiService } from '@/services/sep-api-service'
import { EncontroReqDto, EncontroResDto } from '@/types/dtos/services/encontro'

class EncontroService extends SEPApiService<EncontroReqDto, EncontroResDto> { }

export const encontroService = new EncontroService('/encontros')
