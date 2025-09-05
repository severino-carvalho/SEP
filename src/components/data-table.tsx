import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EntidadeDto } from "@/types/dtos/entidade.dto"
import { FiltroPaginacao, FiltroPaginacaoResponseDto } from "@/types/dtos/filter"
import { RotasAppEnum } from "@/types/enums/rotas-app-enum"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ChevronDown, FolderX, Loader2 } from "lucide-react"
import { Fragment, useMemo, useState } from "react"
import { Link } from "react-router-dom"

export type DataTableProps<T extends EntidadeDto> = {
  columns: ColumnDef<T>[]
  data?: T[]
  href?: RotasAppEnum
  isFetching?: boolean
  paginationData?: FiltroPaginacaoResponseDto<T>
  pageable?: FiltroPaginacao
  onPageableChange?: (pageable: FiltroPaginacao) => void
  searchPlaceholder?: string
  searchAttribute?: string
  // Propriedades para controle de tamanho da página
  pageSizeOptions?: number[]
  showPageSizeSelector?: boolean
}

export function DataTable<T extends EntidadeDto>({
  isFetching = false,
  paginationData,
  pageable,
  onPageableChange,
  searchPlaceholder = "Filtrar por...",
  searchAttribute = "nome",
  pageSizeOptions = [1, 5, 10, 20, 50, 100],
  showPageSizeSelector = true,
  ...props
}: Readonly<DataTableProps<T>>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [searchValue, setSearchValue] = useState("")

  const isServerSidePagination = !!paginationData && !!pageable && !!onPageableChange

  const handleSearchChange = (value: string) => {
    setSearchValue(value)

    if (isServerSidePagination && onPageableChange && pageable) {
      const newFilters = pageable.filters.filter(filter => filter.attribute !== searchAttribute)

      if (value.trim()) {
        newFilters.push({
          attribute: searchAttribute,
          operator: "contains",
          type: "string",
          values: [value.trim()]
        })
      }

      onPageableChange({
        ...pageable,
        page: 0,
        filters: newFilters
      })
    }
  }

  const handlePageSizeChange = (newPageSize: string) => {
    if (isServerSidePagination && onPageableChange && pageable) {
      const size = parseInt(newPageSize)
      if (size > 0 && size <= 1000) { // Validação para evitar valores inválidos
        onPageableChange({
          ...pageable,
          size: size,
          page: 0
        })
      }
    }
  }

  const tableData = useMemo(() => {
    return isServerSidePagination ? (paginationData?.content ?? []) : (props.data ?? [])
  }, [isServerSidePagination, paginationData?.content, props.data])

  const table = useReactTable({
    data: tableData,
    columns: props.columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    ...(isServerSidePagination ? {
      manualPagination: true,
      pageCount: paginationData?.totalPages ?? -1,
    } : {
      getPaginationRowModel: getPaginationRowModel(),
      manualPagination: false,
    }),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(isServerSidePagination ? {} : {})
    },
  })

  const handlePreviousPage = () => {
    if (isServerSidePagination && onPageableChange && pageable) {
      if (pageable.page > 0) onPageableChange({ ...pageable, page: pageable.page - 1 })
    } else table.previousPage()
  }

  const handleNextPage = () => {
    if (isServerSidePagination && onPageableChange && pageable && paginationData) {
      const currentPosition = pageable.page * pageable.size
      const nextPageStartPosition = currentPosition + pageable.size
      if (nextPageStartPosition < paginationData.totalElements) {
        onPageableChange({ ...pageable, page: pageable.page + 1 })
      }
    } else {
      table.nextPage()
    }
  }

  const canPreviousPage = () => {
    if (isServerSidePagination && pageable) return pageable.page > 0
    return table.getCanPreviousPage()
  }

  const canNextPage = () => {
    if (isServerSidePagination && pageable && paginationData) {
      const currentPosition = pageable.page * pageable.size
      const nextPageStartPosition = currentPosition + pageable.size
      return nextPageStartPosition < paginationData.totalElements
    }
    return table.getCanNextPage()
  }

  const getTotalElements = () => {
    if (isServerSidePagination && paginationData) return paginationData.totalElements
    return table.getRowCount()
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-2.5 items-center">
          {props.href && <Link to={props.href}>
            <Button type="button">Adicionar</Button>
          </Link>}

          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
            className="min-w-full"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide() && column.id !== "Ações")
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          {isFetching && (<div className="w-full">
            <Loading />
          </div>)}

          {!isFetching && (
            <Fragment>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (<TableHead key={header.id}>
                      {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowCount() === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={props.columns.length}
                      className="text-center"
                    >
                      <div className="flex flex-1 gap-2.5 items-center flex-col w-full">
                        <FolderX size={48} strokeWidth={1.5} />
                        <span>Sem resultados</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {table.getRowCount() !== 0 && (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="w-full"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Fragment>
          )}
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {isServerSidePagination && paginationData ? (
            <>
              Exibindo {paginationData.content.length} de {paginationData.totalElements} registros
              {paginationData.totalPages > 1 && (
                <> - Página {(paginationData.pageable?.pageNumber ?? 0) + 1} de {paginationData.totalPages}</>
              )}
            </>
          ) : (
            `Total de registros: ${getTotalElements()}`
          )}
        </div>

        {isServerSidePagination && showPageSizeSelector && (
          <div className="flex items-center space-x-2">
            <Select
              value={pageable?.size?.toString() ?? "10"}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageable?.size?.toString() ?? "10"} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={handlePreviousPage}
            disabled={!canPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={!canNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <Loader2 className="animate-spin" size={48} strokeWidth={1.5} />
    </div>
  )
}
