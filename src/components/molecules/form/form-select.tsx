import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
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
  const [valorSelecionado, setValorSelecionado] = useState<string>(
    props.field.value?.toString()
  )

  function onValueChange(opcao: string) {
    props.field.onChange(opcao)
  }

  useEffect(() => { 
    onValueChange(props.field.value)
    setValorSelecionado(props.field.value)
  }, [props.field.value])

  return (
    <FormItem>
      <FormLabel>{props.label}</FormLabel>
      <Select
        onValueChange={onValueChange}
        defaultValue={valorSelecionado}
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