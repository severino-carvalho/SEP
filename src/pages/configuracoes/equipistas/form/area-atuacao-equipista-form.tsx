import { FormCombobox } from "@/components/molecules/form/form-combobox";
import { SelectOption } from "@/components/molecules/form/form-select";
import { FormTextAreaInput } from "@/components/molecules/form/form-text-area-input";
import { FormField } from "@/components/ui/form";
import { EquipistaReqDto } from "@/types/dtos/services/equipista";
import { EFormacao, EOcupacao, EProfissao } from "@/types/enums/app";
import { useFormContext } from "react-hook-form";

export function AreaAtuacaoFrom() {
  const form = useFormContext<EquipistaReqDto>()

  const formacaoOptions = Object.entries(EFormacao)
    .map(([_  , value]) => ({ label: value, value: value } as SelectOption));

  const ocupacaoOptions = Object.entries(EOcupacao)
    .map(([_, value]) => ({ label: value, value: value } as SelectOption));

  const profissaoOptions = Object.entries(EProfissao)
    .map(([_, value]) => ({ label: value, value: value } as SelectOption));

  return (
    <div className="flex flex-col gap-6 p-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          name="areaAtuacao.formacao"
          control={form.control}
          render={({ field }) => (
            <FormCombobox
              field={field as never}
              label="Formação"
              opcoes={formacaoOptions}
              placeholder="Selecione sua formação"
              required={true}
            />
          )}
        />

        <FormField
          name="areaAtuacao.ocupacao"
          control={form.control}
          render={({ field }) => (
            <FormCombobox
              field={field as never}
              label="Ocupação"
              opcoes={ocupacaoOptions}
              placeholder="Selecione sua ocupação"
              required={true}
            />
          )}
        />

        <FormField
          name="areaAtuacao.profissao"
          control={form.control}
          render={({ field }) => (
            <FormCombobox
              field={field as never}
              label="Profissão"
              opcoes={profissaoOptions}
              placeholder="Selecione sua profissão"
              required={true}
            />
          )}
        />
      </div>

      <FormField
        name="areaAtuacao.habilidades"
        control={form.control}
        render={({ field }) => (<FormTextAreaInput label="Habilidades" field={field} />
        )}
      />
    </div>
  )
}
