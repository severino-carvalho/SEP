import { Filter } from '@/types/dtos/filter'
import { FiltroInput } from './filtro-input'
import { FiltrosAtivos } from './filtros-ativos'
import { PaginacaoAvancada } from './paginacao-avancada'
import { FiltroPaginacaoResponseDto } from '@/types/dtos/filter'

interface FiltrosContainerProps {
  // Filtros
  filters: Filter[]
  onAddFilter: (filter: Filter) => void
  onRemoveFilter: (attribute: string) => void
  onClearFilters: () => void
  
  // Paginação
  page: number
  size: number
  onPageChange: (page: number) => void
  onSizeChange: (size: number) => void
  
  // Dados da resposta
  response?: FiltroPaginacaoResponseDto<any>
  
  // Configuração dos campos disponíveis
  availableAttributes: Array<{
    key: string
    label: string
    type: 'string' | 'number'
  }>
  
  // Opções de exibição
  showFilters?: boolean
  showPagination?: boolean
}

export function FiltrosContainer({
  filters,
  onAddFilter,
  onRemoveFilter,
  onClearFilters,
  page,
  size,
  onPageChange,
  onSizeChange,
  response,
  availableAttributes,
  showFilters = true,
  showPagination = true
}: FiltrosContainerProps) {
  return (
    <div className="space-y-4">
      {showFilters && (
        <>
          <FiltroInput
            onAddFilter={onAddFilter}
            availableAttributes={availableAttributes}
          />
          
          <FiltrosAtivos
            filters={filters}
            onRemoveFilter={onRemoveFilter}
            onClearFilters={onClearFilters}
          />
        </>
      )}
      
      {showPagination && response && (
        <PaginacaoAvancada
          page={page}
          size={size}
          totalElements={response.totalElements}
          totalPages={response.totalPages}
          onPageChange={onPageChange}
          onSizeChange={onSizeChange}
        />
      )}
    </div>
  )
} 