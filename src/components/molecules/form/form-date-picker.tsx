import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface FormInputProps extends ComponentProps<'input'> {
  label?: string
  descricao?: string
  field: ControllerRenderProps<any>
  required?: boolean
}

export function FormDatePicker({ field, label, descricao, required, ...props }: FormInputProps) {
  return (
    <FormItem className="flex flex-col flex-1">
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn("w-full h-10 text-left font-normal", !field.value && "text-muted-foreground")}
            >
              {field.value ? (
                format(field.value, "dd/MM/yyyy", { locale: ptBR })
              ) : (
                <span>{props.placeholder}</span>
              )}

              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            captionLayout="dropdown"
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      {descricao && <FormDescription>{descricao}</FormDescription>}

      <FormMessage />
    </FormItem>
  )
}