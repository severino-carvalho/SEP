import { FormInput } from "@/components/molecules/form/form-input";
import { FormField } from "@/components/ui/form";
import { EquipistaReqDto } from "@/types/dtos/services/equipista";
import { useFormContext } from "react-hook-form";

export function EnderecoEquipistaForm() {
  const form = useFormContext<EquipistaReqDto>()

  return (
    <div className="flex flex-col gap-5 p-0">
      <FormField
        name="enderecoDTO.logradouro"
        control={form.control}
        render={({ field }) => (
          <FormInput
            type="text"
            label="Logradouro"
            placeholder="Insira o logradouro"
            {...field}
          />
        )}
      />

      <div className="flex gap-5">
        <FormField
          name="enderecoDTO.cep"
          control={form.control}
          render={({ field }) => (
            <FormInput
              type="text"
              label="CEP"
              placeholder="Insira o CEP"
              {...field}
            />
          )}
        />

        <FormField
          name="enderecoDTO.numero"
          control={form.control}
          render={({ field }) => (
            <FormInput
              type="text"
              label="Número"
              placeholder="Insira o número"
              {...field}
            />
          )}
        />

        <FormField
          name="enderecoDTO.bairro"
          control={form.control}
          render={({ field }) => (
            <FormInput
              type="text"
              label="Bairro"
              placeholder="Insira o bairro"
              {...field}
            />
          )}
        />
      </div>

      <div className="flex gap-5">
        <FormField
          name="enderecoDTO.cidade"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Cidade"
              placeholder="Insira a cidade"
              {...field}
            />
          )}
        />

        <FormField
          name="enderecoDTO.estado"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Estado"
              placeholder="Insira o estado"
              {...field}
            />
          )}
        />
      </div>
    </div>
  )
}