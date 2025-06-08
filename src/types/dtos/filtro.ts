import { EntidadeDto } from "./entidade.dto"

export interface Filter {
  attribute: string
  operator: "equal" | "or" | "not_equal" | "in" | "not_in" | "contains"
  type: string
  values: string[] | number[]
  order?: "ASC" | "DESC"
}

export interface FiltroPaginacao {
  page: number
  size: number
  filters: Filter[]
}

export interface FiltroPaginacaoResponse<T> {
  content: T[]
  totalElements: number
}

export interface FiltroPaginacaoResponseDto<T extends EntidadeDto> {
  "totalPages": number,
  "totalElements": number,
  "pageable": {
    "pageNumber": number,
    "pageSize": number,
    "sort": {
      "sorted": boolean,
      "empty": boolean,
      "unsorted": boolean
    },
    "offset": number,
    "paged": boolean,
    "unpaged": boolean
  },
  "size": number,
  "content": T[],
  "number": number,
  "sort": {
    "sorted": boolean,
    "empty": boolean,
    "unsorted": boolean
  },
  "first": boolean,
  "last": boolean,
  "numberOfElements": number,
  "empty": boolean
}