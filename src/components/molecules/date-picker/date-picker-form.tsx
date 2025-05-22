import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FormInputProps } from "@/types/components/IBasicComponent"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

export function DatePickerForm({ field, ...props }: FormInputProps) {
  return (
    <FormItem className="flex flex-col">
      {props.label && <FormLabel className="pt-1.5 pb-1">{props.label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] h-10 pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? (format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }))
                : (<span>{props.placeholder}</span>)}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          />
        </PopoverContent>
      </Popover>
      {/* <FormDescription>
        Your date of birth is used to calculate your age.
      </FormDescription> */}
      <FormMessage />
    </FormItem>
  )
}