import { ComponentProps, useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

interface FormInputTelefoneProps extends ComponentProps<'input'> {
  label?: string
  descricao?: string
  field?: ControllerRenderProps<any>
  required?: boolean
}

export function FormInputTelefone({ descricao, label, field, required, ...props }: FormInputTelefoneProps) {
  const [displayValue, setDisplayValue] = useState('');

  const applyPhoneMask = (value: string): string => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 2) return `(${numbers}`;
    else if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    else if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    else return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const extractNumbers = (value: string): string => value.replace(/\D/g, '');

  useEffect(() => {
    if (field?.value) setDisplayValue(applyPhoneMask(field.value));
    else setDisplayValue('');
  }, [field?.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numbers = extractNumbers(inputValue);

    if (numbers.length <= 11) {
      const maskedValue = applyPhoneMask(numbers);
      setDisplayValue(maskedValue);

      if (field?.onChange) field.onChange(numbers);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    const isNumber = /^[0-9]$/.test(e.key);

    if (!isNumber && !allowedKeys.includes(e.key)) e.preventDefault();
  };

  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <FormControl>
        <Input
          {...props}
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="(99) 99999-9999"
          maxLength={15}
        />
      </FormControl>

      {descricao && <FormDescription>{descricao}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormInputTelefone.displayName = "FormInputTelefone"; 