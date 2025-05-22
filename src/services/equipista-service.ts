import { SEPApiService } from '@/services/sep-api-service';
import { EquipistaReqDto, EquipistaResDto } from '@/types/dtos/services/equipista';
import { RotasApiEnum } from '@/types/enums/rotas-api-enum';

class EquipistaService extends SEPApiService<EquipistaReqDto, EquipistaResDto> {
  async save(data: EquipistaReqDto): Promise<EquipistaResDto> {
    // Verifica e converte todas as datas dinamicamente
    const processData = (obj: any) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key]
          if (value instanceof Date) {
            // Converte a data para o formato 'yyyy-MM-dd'
            obj[key] = value.toISOString().split('T')[0]
          } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            // Verifica se a string é uma data válida e converte para 'yyyy-MM-dd'
            const date = new Date(value)
            obj[key] = date.toISOString().split('T')[0]
          } else if (typeof value === 'object' && value !== null) {
            processData(value) // Recursivamente trata objetos aninhados
          }
        }
      }
    }

    // Processa os dados para garantir que todas as datas sejam formatadas corretamente
    processData(data)

    // Converte para FormData após a formatação das datas
    const formData = jsonToFormData(data)

    const { data: responseData } = await this.serverAPI.post<EquipistaResDto>(
      this.url,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    return responseData
  }
}

function jsonToFormData(obj: any, formData = new FormData(), namespace = ''): FormData {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue
    const value = obj[key]
    const formKey = namespace ? `${namespace}.${key}` : key

    if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value)
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        const itemKey = `${formKey}[${i}]`
        if (typeof item === 'object' && item !== null) {
          jsonToFormData(item, formData, itemKey)
        } else {
          formData.append(itemKey, item)
        }
      })
    } else if (value instanceof Date) {
      // Formatar a data para o formato 'yyyy-MM-dd'
      const formattedDate = value.toISOString().split('T')[0]; // Exemplo: "2025-05-06"
      formData.append(formKey, formattedDate);
    } else if (typeof value === 'object' && value !== null) {
      jsonToFormData(value, formData, formKey)
    } else if (value !== undefined && value !== null) {
      formData.append(formKey, value.toString())
    }
  }

  return formData
}

export const equipistaService = new EquipistaService(RotasApiEnum.EQUIPISTA)
