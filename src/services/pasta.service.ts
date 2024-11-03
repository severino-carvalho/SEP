import { SEPApiService } from '@/services/sep-api.service'
import { PastaReqDto, PastaResDto } from '@/types/dtos/services/pasta'

class PastaService extends SEPApiService<PastaReqDto, PastaResDto> {}

export const pastaService = new PastaService('')
