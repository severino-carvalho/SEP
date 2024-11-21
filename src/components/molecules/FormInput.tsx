import { ComponentProps } from "react";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormInputProps extends ComponentProps<'input'> {
  label?: string
  descricao?: string
}

export function FormInput(props: FormInputProps) {
  return (
    <FormItem>
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <Input placeholder={props.placeholder} {...props} />
      </FormControl>
      <FormDescription>
        {props.descricao}
      </FormDescription>
      <FormMessage />
    </FormItem>
  )
}