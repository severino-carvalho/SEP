import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { ComponentProps, useState } from "react"
import { ControllerRenderProps } from "react-hook-form"

export type SelectOption = {
  label: string
  value: number | string
}

interface FormMultiSelectProps extends ComponentProps<"div"> {
  label?: string
  descricao?: string
  placeholder?: string
  opcoes: SelectOption[]
  field: ControllerRenderProps
  isLoading?: boolean
}

export function FormMultiSelect(props: FormMultiSelectProps) {
  const { opcoes, field, placeholder, label, descricao, isLoading } = props
  const [open, setOpen] = useState(false)

  // Garante um array de valores
  const selectedValues: (string | number)[] = field?.value ?? []

  function toggleOption(value: string | number) {
    let novaSelecao: (string | number)[]

    if (selectedValues.includes(value)) {
      novaSelecao = selectedValues.filter((v) => v !== value)
    } else {
      novaSelecao = [...selectedValues, value]
    }

    field.onChange(novaSelecao)
  }

  return (
    <FormItem className="flex-1">
      {label && <FormLabel>{label}</FormLabel>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {selectedValues.length > 0
                ? opcoes
                  .filter((op) => selectedValues.includes(op.value))
                  .map((op) => op.label)
                  .join(", ")
                : placeholder || "Selecione..."}

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandGroup>
              {isLoading ? (
                <CommandItem disabled>Carregando opções...</CommandItem>
              ) : opcoes.length === 0 ? (
                <CommandItem disabled>Nenhuma opção disponível</CommandItem>
              ) : (
                opcoes.map((opcao) => (
                  <CommandItem
                    key={opcao.value}
                    onSelect={() => toggleOption(opcao.value)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${selectedValues.includes(opcao.value)
                        ? "opacity-100"
                        : "opacity-0"
                        }`}
                    />
                    {opcao.label}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {descricao && <FormDescription>{descricao}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
