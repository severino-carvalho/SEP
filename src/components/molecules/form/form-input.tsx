import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

interface FormInputProps extends ComponentProps<'input'> {
  label?: string
  descricao?: string
  field?: ControllerRenderProps<any>
}

export function FormInput({ descricao, label, ...props }: FormInputProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...props} />
      </FormControl>
      {descricao && <FormDescription>{descricao}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormInput.displayName = "FormInput";