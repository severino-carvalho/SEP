import { FormSelect, SelectOption } from "@/components/molecules/form/form-select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EquipistaReqDto } from "@/types/dtos/services/equipista";
import { EFormacao, EOcupacao, EProfissao } from "@/types/enums/app";
import { useFormContext } from "react-hook-form";

export function AreaAtuacaoFrom() {
  const form = useFormContext<EquipistaReqDto>()

  const formacaoOptions = Object.entries(EFormacao)
    .map(([key, value]) => ({ label: value, value: key } as SelectOption));

  const ocupacaoOptions = Object.entries(EOcupacao)
    .map(([key, value]) => ({ label: value, value: key } as SelectOption));

  const profissaoOptions = Object.entries(EProfissao)
    .map(([key, value]) => ({ label: value, value: key } as SelectOption));

  return (
    <div className="flex flex-col gap-5 p-0">
      <FormField
        name="areaAtuacaoDTO.formacao"
        control={form.control}
        render={({ field }) => (
          <FormSelect
            field={field as never}
            label="Formação"
            opcoes={formacaoOptions}
            placeholder="Selecione sua formação"
          />
        )}
      />

      <FormField
        name="areaAtuacaoDTO.ocupacao"
        control={form.control}
        render={({ field }) => (
          <FormSelect
            field={field as never}
            label="Ocupação"
            opcoes={ocupacaoOptions}
            placeholder="Selecione sua ocupação"
          />
        )}
      />

      <FormField
        name="areaAtuacaoDTO.profissao"
        control={form.control}
        render={({ field }) => (
          <FormSelect
            field={field as never}
            label="Profissão"
            opcoes={profissaoOptions}
            placeholder="Selecione sua profissão"
          />
        )}
      />

      <FormField
        name="areaAtuacaoDTO.habilidades"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Habilidades</FormLabel>
            <FormControl>
              <Textarea
                className="resize-none"
                placeholder="Insira suas habilidades"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
