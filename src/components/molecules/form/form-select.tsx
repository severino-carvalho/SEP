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
}

export function FormSelect(props: FormSelectProps) {
  function onValueChange(opcao: string) {
    console.log(opcao)

    if (opcao) props.field.onChange(opcao)
  }

  return (
    <FormItem className="flex-1">
      <FormLabel>{props.label}</FormLabel>

      <Select onValueChange={onValueChange} value={props.field.value?.toString()}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {props.isLoading && (<SelectItem value="0" disabled>Carregando opçõess...</SelectItem>)}

          {!props.isLoading && props.opcoes.length === 0 && (
            <SelectItem value="0" disabled>Nenhuma opção disponível</SelectItem>
          )}

          {props.opcoes.map(opcao => (
            <SelectItem value={opcao.value.toString()}>
              {opcao.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FormDescription>{props.descricao}</FormDescription>

      <FormMessage />
    </FormItem>
  )
}