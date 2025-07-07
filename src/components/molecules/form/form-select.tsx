import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";

export type SelectOption = {
  label: string
  value: number | string
}

interface FormSelectProps extends ComponentProps<'select'> {
  label?: string
  descricao?: string
  placeholder?: string
  opcoes: SelectOption[]
  field: ControllerRenderProps
  isLoading?: boolean
  required?: boolean
}

export function FormSelect({
  label,
  descricao,
  placeholder,
  opcoes,
  field,
  isLoading,
  required,
}: FormSelectProps) {
  function onValueChange(opcao: string) {
    if (opcao) field.onChange(opcao)
  }

  return (
    <FormItem className="flex flex-col flex-1">
      <FormLabel required={required}>{label}</FormLabel>

      <Select onValueChange={onValueChange} value={field.value?.toString()}>
        <FormControl>
          <SelectTrigger className={`${!field.value ? 'text-muted-foreground' : ''}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {isLoading && (<SelectItem value="0" disabled>Carregando opçõess...</SelectItem>)}

          {!isLoading && opcoes.length === 0 && (
            <SelectItem value="0" disabled>Nenhuma opção disponível</SelectItem>
          )}

          {opcoes.map(opcao => (
            <SelectItem value={opcao.value.toString()}>
              {opcao.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {descricao && <FormDescription>{descricao}</FormDescription>}

      <FormMessage />
    </FormItem>
  )
}