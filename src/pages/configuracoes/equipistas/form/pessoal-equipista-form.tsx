import { FormDatePicker } from "@/components/molecules/form/form-date-picker";
import { FormInput } from "@/components/molecules/form/form-input";
import { FormInputTelefone } from "@/components/molecules/form/form-input-telefone";
import { FormSelect, SelectOption } from "@/components/molecules/form/form-select";
import { FormField } from "@/components/ui/form";
import { EquipistaReqDto } from "@/types/dtos/services/equipista";
import { EEstadoCivil } from "@/types/enums/app";
import { useFormContext } from "react-hook-form";

export function CadastrosBasicos() {
  const form = useFormContext<EquipistaReqDto>()

  const estadoCivilOptions = Object.entries(EEstadoCivil)
    .map(([key, value]) => ({ label: value, value: value, } as SelectOption));

  return (
    <div className="flex flex-col gap-6 p-0">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FormField
          name="dataNascimento"
          control={form.control}
          render={({ field }) => (
            <FormDatePicker
              field={field}
              label="Data de nascimento"
              placeholder="Ex: 01/01/2000"
            />
          )}
        />

        <FormField
          name="numeroTelefone"
          control={form.control}
          render={({ field }) => (
            <FormInputTelefone
              label="Número de telefone"
              field={field}
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
              type="text"
              label="Filhos"
              placeholder="Insira o número de filhos"
              className="min-w-full h-10"
              {...field}
            />
          )}
        />
      </div>
    </div>
  )
}
