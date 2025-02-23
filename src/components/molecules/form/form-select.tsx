import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";

export type SelectOption = {
  label: string
  value: number
}

interface FormSelectProps {
  label?: string
  descricao?: string
  mensagemNaoSelecionado?: string
  opcoes: SelectOption[]
  field: ControllerRenderProps<any>
  isLoading?: boolean
}

export function FormSelect(props: FormSelectProps) {
  function onValueChange(opcao: string) {
    if (opcao) props.field.onChange(opcao)
  }

  return (
    <FormItem>
      <FormLabel>{props.label}</FormLabel>
      <Select onValueChange={onValueChange} value={props.field.value?.toString()}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={props.mensagemNaoSelecionado} />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {props.isLoading && (
            <SelectItem value="0" disabled>Carregando opçõess...</SelectItem>
          )}

          {
            !props.isLoading && props.opcoes.length === 0 && (
              <SelectItem value="0">Nenhuma opção disponível</SelectItem>
            )
          }

          {
            props.opcoes.map(opcao => (
              <SelectItem value={opcao.value.toString()}>
                {opcao.label}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      <FormDescription>
        {props.descricao}
      </FormDescription>

      <FormMessage />
    </FormItem>
  )
}