import { EntidadeDto } from "./entidade.dto"

export interface FiltroPaginacaoDto<T extends EntidadeDto> {
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