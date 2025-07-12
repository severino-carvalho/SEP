import { SEPApiService } from '@/services/sep-api-service';
import { EquipistaReqDto, EquipistaResDto } from '@/types/dtos/services/equipista';
import { RotasApiEnum } from '@/types/enums/rotas-api-enum';

class EquipistaService extends SEPApiService<EquipistaReqDto, EquipistaResDto> {
  async save(data: EquipistaReqDto): Promise<EquipistaResDto> {
    const processData = (obj: any) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key]
          if (value instanceof Date) {
            const day = value.getDate().toString().padStart(2, '0')
            const month = (value.getMonth() + 1).toString().padStart(2, '0')
            const year = value.getFullYear()
            obj[key] = `${day}/${month}/${year}`
          } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            const date = new Date(value)
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            obj[key] = `${day}/${month}/${year}`
          } else if (typeof value === 'object' && value !== null) {
            processData(value)
          }
        }
      }
    }

    processData(data)

    if (data.endereco?.cep) {
      const cepNumbers = data.endereco.cep.replace(/\D/g, '');
      if (cepNumbers.length === 8) {
        data.endereco.cep = `${cepNumbers.slice(0, 5)}-${cepNumbers.slice(5)}`;
      }
    }

    const formData = jsonToFormData(data)
    
    // Adiciona arquivo se existir, senão adiciona um arquivo vazio
    if (data.arquivo) {
      formData.append('arquivo', data.arquivo)
    } else {
      // Cria um arquivo vazio para satisfazer a exigência do backend
      const emptyFile = new File([''], 'empty.txt', { type: 'text/plain' })
      formData.append('arquivo', emptyFile)
    }

    const { data: responseData } = await this.serverAPI.post<EquipistaResDto>(
      this.url,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    return responseData
  }

  async update(id: number, data: EquipistaReqDto): Promise<EquipistaResDto> {
    const processData = (obj: any) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key]
          if (value instanceof Date) {
            const day = value.getDate().toString().padStart(2, '0')
            const month = (value.getMonth() + 1).toString().padStart(2, '0')
            const year = value.getFullYear()
            obj[key] = `${day}/${month}/${year}`
          } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            const date = new Date(value)
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            obj[key] = `${day}/${month}/${year}`
          } else if (typeof value === 'object' && value !== null) {
            processData(value)
          }
        }
      }
    }

    processData(data)

    if (data.endereco?.cep) {
      const cepNumbers = data.endereco.cep.replace(/\D/g, '');
      if (cepNumbers.length === 8) {
        data.endereco.cep = `${cepNumbers.slice(0, 5)}-${cepNumbers.slice(5)}`;
      }
    }

    const formData = jsonToFormData(data)
    
    // Adiciona arquivo se existir, senão adiciona um arquivo vazio
    if (data.arquivo) {
      formData.append('arquivo', data.arquivo)
    } else {
      // Cria um arquivo vazio para satisfazer a exigência do backend
      const emptyFile = new File([''], 'empty.txt', { type: 'text/plain' })
      formData.append('arquivo', emptyFile)
    }

    const { data: responseData } = await this.serverAPI.put<EquipistaResDto>(
      `${this.url}/${id}`,
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
      const day = value.getDate().toString().padStart(2, '0')
      const month = (value.getMonth() + 1).toString().padStart(2, '0')
      const year = value.getFullYear()

      const formattedDate = `${day}/${month}/${year}`
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
