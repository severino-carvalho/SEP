import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { ComponentProps, useState, useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";

export type SelectOption = {
  label: string
  value: number | string
}

interface FormMultiSelectProps extends ComponentProps<'div'> {
  label?: string
  descricao?: string
  placeholder?: string
  opcoes: SelectOption[]
  field: ControllerRenderProps<any>
  isLoading?: boolean
}

export function FormMultiSelect({
  label,
  descricao,
  placeholder,
  opcoes = [],
  field,
  isLoading,
  className,
  ...props
}: FormMultiSelectProps) {
  const [open, setOpen] = useState(false)



  // Garante que o valor seja sempre um array
  const selectedValues = Array.isArray(field.value) ? field.value : (field.value === undefined ? [] : [field.value]);
  
  // Garante que as opções sejam sempre um array
  const safeOpcoes = Array.isArray(opcoes) ? opcoes : [];

  // Inicializa o campo se estiver undefined
  useEffect(() => {
    if (field.value === undefined) {
      field.onChange([]);
    }
  }, [field]);

  function onValueChange(value: string) {
    if (!safeOpcoes || safeOpcoes.length === 0) return;
    
    const numericValue = typeof safeOpcoes[0]?.value === 'number' ? Number(value) : value;
    
    if (selectedValues.includes(numericValue)) {
      // Remove o valor se já estiver selecionado
      const newValues = selectedValues.filter(v => v !== numericValue);
      field.onChange(newValues);
    } else {
      // Adiciona o valor se não estiver selecionado
      const newValues = [...selectedValues, numericValue];
      field.onChange(newValues);
    }
  }

  function removeValue(value: string | number) {
    const newValues = selectedValues.filter(v => v !== value);
    field.onChange(newValues);
  }

  const selectedOptions = safeOpcoes.filter(option => 
    selectedValues.includes(option.value)
  );



  return (
    <FormItem className={cn("flex flex-col flex-1", className)} {...props}>
      {label && <FormLabel>{label}</FormLabel>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between min-h-10", !selectedValues.length && "text-muted-foreground")}
              disabled={isLoading}
            >
              <div className="flex flex-wrap gap-1 flex-1 justify-start">
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="text-xs"
                    >
                      {option.label || 'Opção sem nome'}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeValue(option.value);
                        }}
                      />
                    </Badge>
                  ))
                ) : (
                  <span>{placeholder || 'Selecione as opções'}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={`Buscar ${label?.toLowerCase() || 'opções'}...`} />
            <CommandList>
              <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
              <CommandGroup>
                {isLoading && (
                  <CommandItem value="loading" disabled>
                    Carregando opções...
                  </CommandItem>
                )}
                {!isLoading && safeOpcoes.length === 0 && (
                  <CommandItem value="empty" disabled>
                    Nenhuma opção disponível
                  </CommandItem>
                )}
                {safeOpcoes.map((opcao) => (
                  <CommandItem
                    key={opcao.value}
                    value={opcao.value.toString()}
                    onSelect={onValueChange}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(opcao.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {opcao.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {descricao && <FormDescription>{descricao}</FormDescription>}

      <FormMessage />
    </FormItem>
  )
}