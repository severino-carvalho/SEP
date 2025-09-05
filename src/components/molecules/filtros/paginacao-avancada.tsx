import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FiltroPaginacaoResponseDto } from '@/types/dtos/filter'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginacaoAvancadaProps {
  page: number
  size: number
  totalElements: number
  totalPages: number
  onPageChange: (page: number) => void
  onSizeChange: (size: number) => void
}

const PAGE_SIZES = [5, 10, 20, 50, 100]

export function PaginacaoAvancada({
  page,
  size,
  totalElements,
  totalPages,
  onPageChange,
  onSizeChange
}: PaginacaoAvancadaProps) {
  const startItem = page * size + 1
  const endItem = Math.min((page + 1) * size, totalElements)

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value) - 1
    if (!isNaN(newPage) && newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="text-sm">Itens por página:</Label>
          <Select value={size.toString()} onValueChange={(value) => onSizeChange(parseInt(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          Mostrando {startItem} a {endItem} de {totalElements} resultados
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(0)}
          disabled={page === 0}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm">Página</span>
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={page + 1}
            onChange={handlePageInputChange}
            className="w-16 text-center"
          />
          <span className="text-sm">de {totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 