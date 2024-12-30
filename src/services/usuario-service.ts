import { SEPApiService } from '@/services/sep-api-service'
import { UsuarioReqDto, UsuarioResDto } from '@/types/dtos/services/usuario'
import { RotasApiEnum } from '@/types/enums/rotas-api-enum'

class UsuarioService extends SEPApiService<UsuarioReqDto, UsuarioResDto> { }

export const usuarioService = new UsuarioService(RotasApiEnum.USUARIOS)
