import { useState } from 'react'
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
import { Filter } from '@/types/dtos/filter'
import { X, Plus } from 'lucide-react'

interface FiltroInputProps {
  onAddFilter: (filter: Filter) => void
  availableAttributes: Array<{
    key: string
    label: string
    type: 'string' | 'number'
  }>
}

const OPERATORS = [
  { value: 'equal', label: 'Igual' },
  { value: 'not_equal', label: 'Diferente' },
  { value: 'contains', label: 'Contém' },
  { value: 'in', label: 'Em' },
  { value: 'not_in', label: 'Não em' },
  { value: 'or', label: 'Ou' }
] as const

export function FiltroInput({ onAddFilter, availableAttributes }: FiltroInputProps) {
  const [attribute, setAttribute] = useState('')
  const [operator, setOperator] = useState<Filter['operator']>('equal')
  const [value, setValue] = useState('')
  const [type, setType] = useState<'string' | 'number'>('string')

  const handleAddFilter = () => {
    if (!attribute || !value.trim()) return

    const filter: Filter = {
      attribute,
      operator,
      type,
      values: type === 'number' ? [Number(value)] : [value.trim()]
    }

    onAddFilter(filter)
    
    // Reset form
    setAttribute('')
    setOperator('equal')
    setValue('')
    setType('string')
  }

  const handleAttributeChange = (newAttribute: string) => {
    setAttribute(newAttribute)
    const attr = availableAttributes.find(a => a.key === newAttribute)
    if (attr) {
      setType(attr.type)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        <Label className="font-medium">Adicionar Filtro</Label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="space-y-1">
          <Label htmlFor="attribute">Campo</Label>
          <Select value={attribute} onValueChange={handleAttributeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o campo" />
            </SelectTrigger>
            <SelectContent>
              {availableAttributes.map((attr) => (
                <SelectItem key={attr.key} value={attr.key}>
                  {attr.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="operator">Operador</Label>
          <Select value={operator} onValueChange={(value) => setOperator(value as Filter['operator'])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OPERATORS.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="value">Valor</Label>
          <Input
            id="value"
            type={type === 'number' ? 'number' : 'text'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Digite o valor"
          />
        </div>

        <div className="flex items-end">
          <Button 
            onClick={handleAddFilter}
            disabled={!attribute || !value.trim()}
            className="w-full"
          >
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  )
} 