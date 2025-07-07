import { ComponentProps, useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

interface FormInputCepProps extends ComponentProps<'input'> {
  label?: string
  descricao?: string
  field?: ControllerRenderProps<any>
  required?: boolean
}

export function FormInputCep({ descricao, label, field, required, ...props }: FormInputCepProps) {
  const [displayValue, setDisplayValue] = useState('');

  // Função para aplicar máscara de CEP brasileiro
  const applyCepMask = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara baseada no número de dígitos
    if (numbers.length <= 5) {
      return numbers;
    } else {
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    }
  };

  // Função para extrair apenas números do valor com máscara
  const extractNumbers = (value: string): string => {
    return value.replace(/\D/g, '');
  };

  // Atualiza o valor de exibição quando o campo muda
  useEffect(() => {
    if (field?.value) {
      setDisplayValue(applyCepMask(field.value));
    } else {
      setDisplayValue('');
    }
  }, [field?.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numbers = extractNumbers(inputValue);
    
    // Limita a 8 dígitos (CEP brasileiro)
    if (numbers.length <= 8) {
      const maskedValue = applyCepMask(numbers);
      setDisplayValue(maskedValue);
      
      // Atualiza o valor do campo com apenas números
      if (field?.onChange) {
        field.onChange(numbers);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite apenas números, backspace, delete, tab, escape, enter
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    const isNumber = /^[0-9]$/.test(e.key);
    
    if (!isNumber && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <FormItem className="flex flex-col">
      <FormLabel required={required}>{label}</FormLabel>
      <FormControl>
        <Input
          {...props}
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="00000-000"
          maxLength={9} // 00000-000 = 9 caracteres
        />
      </FormControl>
      {descricao && <FormDescription>{descricao}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

FormInputCep.displayName = "FormInputCep"; 