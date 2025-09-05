import { Filter } from '@/types/dtos/filter'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Filter as FilterIcon } from 'lucide-react'

interface FiltrosAtivosProps {
  filters: Filter[]
  onRemoveFilter: (attribute: string) => void
  onClearFilters: () => void
}

const OPERATOR_LABELS: Record<Filter['operator'], string> = {
  equal: '=',
  not_equal: '≠',
  contains: 'contém',
  in: 'em',
  not_in: 'não em',
  or: 'ou'
}

export function FiltrosAtivos({ filters, onRemoveFilter, onClearFilters }: FiltrosAtivosProps) {
  if (filters.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Filtros Ativos</span>
          <Badge variant="secondary">{filters.length}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-6 px-2 text-xs"
        >
          Limpar Todos
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Badge
            key={filter.attribute}
            variant="outline"
            className="flex items-center gap-1 px-2 py-1"
          >
            <span className="font-medium">{filter.attribute}</span>
            <span className="text-muted-foreground">
              {OPERATOR_LABELS[filter.operator]}
            </span>
            <span className="font-mono">
              {Array.isArray(filter.values) 
                ? filter.values.join(', ')
                : filter.values
              }
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveFilter(filter.attribute)}
              className="h-4 w-4 p-0 hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
} 