import { FormInput } from "@/components/molecules/form/form-input";
import { FormSelect, SelectOption } from "@/components/molecules/form/form-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { EquipistaReqDto } from "@/types/dtos/services/equipista";
import { EEstadoCivil } from "@/types/enums/app";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function CadastrosBasicos() {
  const form = useFormContext<EquipistaReqDto>()

  const estadoCivilOptions = Object.entries(EEstadoCivil)
    .map(([key, value]) => ({ label: value, value: key, } as SelectOption));

  return (
    <div className="flex flex-col gap-5 p-0">
      <FormField
        name="nome"
        control={form.control}
        render={({ field }) => (
          <FormInput
            type="text"
            label="Nome"
            placeholder="Insira o nome do equipista"
            {...field}
          />
        )}
      />

      <div className="flex gap-5">
        <FormField
          name="dataNascimento"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5 pt-1">
              <FormLabel>Data de nascimento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 h-10 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? (format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }))
                        : (<span>Insira sua data de nascimento</span>)}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value as unknown as Date}
                    onSelect={(value) => field.onChange(value?.toString())}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="numeroTelefone"
          control={form.control}
          render={({ field }) => (
            <FormInput
              type="tel"
              label="Número de telefone"
              placeholder="Insira seu número"
              {...field}
            />
          )}
        />

        <FormField
          name="estadoCivil"
          control={form.control}
          render={({ field }) => (
            <FormSelect
              field={field as never}
              label="Estado civil"
              opcoes={estadoCivilOptions}
              placeholder="Selecione um estado civil"
            />
          )}
        />

        <FormField
          name="filhos"
          control={form.control}
          render={({ field }) => (
            <FormInput
              type="number"
              label="Filhos"
              placeholder="Insira o número de filhos"
              className="flex-1 min-w-full"
              {...field}
            />
          )}
        />
      </div>
    </div>
  )
}
