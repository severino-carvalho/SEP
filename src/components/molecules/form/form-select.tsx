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
}

export function FormSelect(props: FormSelectProps) {
  function onValueChange(opcao: string) {
    props.field.onChange(opcao)
  }

  return (
    <FormItem>
      <FormLabel>{props.label}</FormLabel>
      <Select
        onValueChange={onValueChange}
        defaultValue={props.field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={props.mensagemNaoSelecionado} />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {
            props.opcoes.map(opcao => (
              <SelectItem value={opcao.value?.toString() || ''}>
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