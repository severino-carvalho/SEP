import { ComponentProps, forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

interface FormInputProps extends ComponentProps<'input'> {
  label?: string;
  descricao?: string;
  field?: ControllerRenderProps<any>;
}

export const FormInputFile = forwardRef<HTMLInputElement, FormInputProps>(
  ({ descricao, field, label, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (field?.onChange && !!files && files?.length !== 0) field.onChange(files[0])
    };

    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type="file" {...props} onChange={handleChange} ref={ref} />
        </FormControl>

        {descricao && <FormDescription>{descricao}</FormDescription>}

        <FormMessage />
      </FormItem>
    );
  });