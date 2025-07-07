import { Textarea } from "@/components/ui/textarea";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";

interface FormInputProps extends ComponentProps<'input'> {
  label?: string
  descricao?: string
  field?: ControllerRenderProps<any>
}

export function FormTextAreaInput({ field, descricao, label }: FormInputProps) {
  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel>Habilidades</FormLabel>}

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