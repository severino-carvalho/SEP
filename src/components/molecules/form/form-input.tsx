import { ComponentProps, forwardRef } from "react";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

interface FormInputProps extends ComponentProps<'input'> {
  label?: string
  descricao?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, descricao, ...props }, ref) => {
    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...props} ref={ref} />
        </FormControl>
        {descricao && <FormDescription>{descricao}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  }
);

FormInput.displayName = "FormInput";