import { ChangeEvent, ComponentProps } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"

/**
 * Propriedades para o componente FormInputFile.
 * 
 * @typedef {Object} FormInputProps
 * @property {string} [label] - O rótulo do campo de entrada.
 * @property {string} [descricao] - Descrição adicional para o campo de entrada.
 * @property {ControllerRenderProps<any>} [field] - Propriedades do campo do react-hook-form.
 */
interface FormInputProps extends ComponentProps<'input'> {
  label: string
  descricao?: string
  field: ControllerRenderProps<any>
}

/**
 * Um componente de entrada de arquivo personalizado com funcionalidades adicionais.
 * 
 * @param {FormInputProps} props - As propriedades para o componente.
 * @param {string} [props.label] - O rótulo do campo de entrada.
 * @param {string} [props.descricao] - Descrição adicional para o campo de entrada.
 * @param {ControllerRenderProps<any>} [props.field] - Propriedades do campo do react-hook-form.
 * @param {React.Ref<HTMLInputElement>} ref - A referência para o elemento de entrada.
 * @returns {JSX.Element} O componente FormInputFile.
 */
export function FormInputFile({ descricao, field, label, ...props }: FormInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!!files && files?.length !== 0) field?.onChange(files[0])
  }

  return (
    <FormItem className="flex flex-col w-full">
      {label && <FormLabel>{label}</FormLabel>}

      <FormControl>
        <Input type="file" {...props} onChange={handleChange} />
      </FormControl>

      {descricao && <FormDescription>{descricao}</FormDescription>}

      <FormMessage />
    </FormItem>
  )
}
