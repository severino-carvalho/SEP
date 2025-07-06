import { SEPApiService } from '@/services/sep-api-service';
import { EquipeReqDto, EquipeResDto } from '@/types/dtos/services/equipe';
import { RotasApiEnum } from '@/types/enums/rotas-api-enum';

class EquipeService extends SEPApiService<EquipeReqDto, EquipeResDto> {
  private createFormData(data: EquipeReqDto): FormData {
    const formData = new FormData()
    
    formData.append('nome', data.nome)
    formData.append('encontroId', data.encontroId.toString())
    
    if (data.arquivo) {
      formData.append('arquivo', data.arquivo)
    }
    
    return formData
  }

  public async save(data: EquipeReqDto): Promise<EquipeResDto> {
    const formData = this.createFormData(data)
    const { data: responseData } = await this.serverAPI.post<EquipeResDto>(this.url, formData)
    return responseData
  }

  public async update(id: number, data: EquipeReqDto): Promise<EquipeResDto> {
    const formData = this.createFormData(data)
    const { data: responseData } = await this.serverAPI.put<EquipeResDto>(`${this.url}/${id}`, formData)
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
