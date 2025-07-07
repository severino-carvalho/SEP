import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Info } from "lucide-react";
import { ComponentProps, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type SelectOption = {
  label: string
  value: number | string
}

interface FormComboboxProps extends ComponentProps<'div'> {
  label?: string
  descricao?: string
  placeholder?: string
  opcoes: SelectOption[]
  field: ControllerRenderProps<any>
  isLoading?: boolean
  showTooltip?: boolean
  tooltipContent?: string
  required?: boolean
}

export function FormCombobox({
  label,
  descricao,
  placeholder,
  opcoes,
  field,
  isLoading,
  showTooltip = false,
  tooltipContent,
  required,
  className,
  ...props
}: FormComboboxProps) {
  const [open, setOpen] = useState(false)

  const selectedOption = opcoes.find(option => option.value.toString() === field.value?.toString())
  


  function onValueChange(value: string) {
    if (value) {
      field.onChange(value)
      setOpen(false)
    }
  }

  return (
    <FormItem className={cn("flex flex-col flex-1", className)} {...props}>
      <div className="flex items-center gap-2">
        {label && <FormLabel required={required}>{label}</FormLabel>}

        {showTooltip && tooltipContent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>

              <TooltipContent>
                <p className="max-w-xs">{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
              disabled={isLoading}
            >
              {selectedOption ? selectedOption.label : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={`Buscar ${label?.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
              <CommandGroup>
                {isLoading && (
                  <CommandItem value="loading" disabled>
                    Carregando opções...
                  </CommandItem>
                )}
                {!isLoading && opcoes.length === 0 && (
                  <CommandItem value="empty" disabled>
                    Nenhuma opção disponível
                  </CommandItem>
                )}
                {opcoes.map((opcao) => (
                  <CommandItem
                    key={opcao.value}
                    value={opcao.value.toString()}
                    onSelect={onValueChange}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value?.toString() === opcao.value.toString()
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