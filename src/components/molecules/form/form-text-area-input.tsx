import { Textarea } from "@/components/ui/textarea";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";

interface FormInputProps extends ComponentProps<'input'> {
  label?: string
  descricao?: string
  field?: ControllerRenderProps<any>
  required?: boolean
}

export function FormTextAreaInput({ field, descricao, label, required }: FormInputProps) {
  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <FormControl>
        <Textarea
          className="resize-none"
          placeholder="Insira suas habilidades"
          {...field}
        />
      </FormControl>

      {descricao && <FormDescription>{descricao}</FormDescription>}

      <FormMessage />
    </FormItem>
  );
}

FormTextAreaInput.displayName = "FormInput";