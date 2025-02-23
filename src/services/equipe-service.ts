import { SEPApiService } from '@/services/sep-api-service';
import { EquipeReqDto, EquipeResDto } from '@/types/dtos/services/equipe';
import { RotasApiEnum } from '@/types/enums/rotas-api-enum';
import { AxiosRequestConfig } from 'axios';

class EquipeService extends SEPApiService<EquipeReqDto, EquipeResDto> {
  public async save(data: EquipeReqDto): Promise<EquipeResDto> {
    const options: AxiosRequestConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
    const { data: responseData } = await this.serverAPI.post<EquipeResDto>(this.url, data, { ...options })
    return responseData
  }

  public async update(id: number, data: EquipeReqDto): Promise<EquipeResDto> {
    const options: AxiosRequestConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
    const { data: responseData } = await this.serverAPI.put<EquipeResDto>(`${this.url}/${id}`, data, { ...options })
    return responseData
  }

  public async deletePasta(equiepid: number, pastaId: number) {
    const { data: responseData } = await this.serverAPI.delete<EquipeResDto>(`${this.url}/${equiepid}/${pastaId}`)
    return responseData
  }

  public async downloadPasta(pastaId: number) {
    const { data: responseData } = await this.serverAPI.get<Blob>(`${this.url}/pasta/${pastaId}`, { responseType: 'blob' })
    return responseData
  }
}

export const equipeService = new EquipeService(RotasApiEnum.EQUIPE)
