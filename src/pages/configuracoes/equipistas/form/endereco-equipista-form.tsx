import { FormInput } from "@/components/molecules/form/form-input";
import { FormInputCep } from "@/components/molecules/form/form-input-cep";
import { FormField } from "@/components/ui/form";
import { EquipistaReqDto } from "@/types/dtos/services/equipista";
import { useFormContext } from "react-hook-form";

export function EnderecoEquipistaForm() {
  const form = useFormContext<EquipistaReqDto>()

  return (
    <div className="flex flex-col gap-6 p-0">
      <FormField
        name="endereco.logradouro"
        control={form.control}
        render={({ field }) => (
          <FormInput
            type="text"
            label="Logradouro"
            placeholder="Insira o logradouro"
            required={true}
            {...field}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          name="endereco.cep"
          control={form.control}
          render={({ field }) => (
            <FormInputCep
              label="CEP"
              field={field}
              required={true}
            />
          )}
        />

        <FormField
          name="endereco.numero"
          control={form.control}
          render={({ field }) => (
            <FormInput
              type="text"
              label="Número"
              placeholder="Insira o número"
              required={true}
              {...field}
            />
          )}
        />

        <FormField
          name="endereco.bairro"
          control={form.control}
          render={({ field }) => (
            <FormInput
              type="text"
              label="Bairro"
              placeholder="Insira o bairro"
              required={true}
              {...field}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="endereco.cidade"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Cidade"
              placeholder="Insira a cidade"
              required={true}
              {...field}
            />
          )}
        />

        <FormField
          name="endereco.estado"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Estado"
              placeholder="Insira o estado"
              required={true}
              {...field}
            />
          )}
        />
      </div>

      <FormField
        name="endereco.complemento"
        control={form.control}
        render={({ field }) => (
          <FormInput
            type="text"
            label="Complemento"
            placeholder="Insira o complemento (opcional)"
            {...field}
          />
        )}
      />
    </div>
  )
}