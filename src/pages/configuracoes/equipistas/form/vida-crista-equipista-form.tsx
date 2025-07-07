import { FormCombobox } from "@/components/molecules/form/form-combobox";
import { FormMultiSelect } from "@/components/molecules/form/form-multi-select";
import { SelectOption } from "@/components/molecules/form/form-select";
import { FormField } from "@/components/ui/form";
import { ErroUtil } from "@/lib/erros/erro-util";
import { encontroService } from "@/services/encontro-service";
import { pastoralService } from "@/services/pastoral-service";
import { EquipistaReqDto } from "@/types/dtos/services/equipista";
import { ESacramento } from "@/types/enums/app";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export function ExtrasEquipistaForm() {
  const form = useFormContext<EquipistaReqDto>()

  async function fetchPastorais() {
    try {
      const response = await pastoralService.findAll()
      return (response as any)?.content || response || []
    } catch (error) {
      ErroUtil.tratar(error)
      return []
    }
  }

  async function fetchEncontros() {
    try {
      const response = await encontroService.findAll()
      return (response as any)?.content || response || []
    } catch (error) {
      ErroUtil.tratar(error)
      return []
    }
  }

  const { data: pastorais } = useQuery({
    queryKey: [RotasApiEnum.PASTORAL],
    queryFn: fetchPastorais
  })

  const { data: encontros, isLoading: isLoadingEncontros, error: errorEncontros } = useQuery({
    queryKey: [RotasApiEnum.ENCONTROS],
    queryFn: fetchEncontros
  })



  const pastoraisOptions = Array.isArray(pastorais)
    ? pastorais.map((pastoral: any) => ({ label: pastoral.nome, value: pastoral.id } as SelectOption))
    : [];

  const sacramentosOptions = Object.entries(ESacramento)
    .map(([key, value]) => ({ label: value, value: value } as SelectOption));



  const encontrosOptions = Array.isArray(encontros)
    ? encontros.map((encontro: any) => ({ label: encontro.nome, value: encontro.id } as SelectOption))
    : [];



  return (
    <div className="flex flex-col gap-6 p-0">
      <FormField
        name="idPastorais"
        control={form.control}
        render={({ field }) => (
          <FormMultiSelect
            field={field}
            label="Participação em pastorais"
            opcoes={pastoraisOptions}
            placeholder="Selecione as pastorais em qual você faz parte"
          />
        )}
      />

      <FormField
        name="sacramento"
        control={form.control}
        render={({ field }) => (
          <FormCombobox
            field={field}
            showTooltip={true}
            label="Sacramentos"
            opcoes={sacramentosOptions}
            placeholder="Selecione seu último sacramento recebido"
            tooltipContent="Considere a sequência: Batismo → Eucaristia → Crisma → etc."
          />
        )}
      />

      <FormField
        name="participacoesEncontro"
        control={form.control}
        render={({ field }) => {
          // Converte IDs para objetos completos quando necessário
          const handleValueChange = (selectedIds: number[]) => {
            const participacoes = selectedIds.map(id => ({
              idEquipe: id,
              ano: new Date().getFullYear(),
              tipoParticipacao: 'Encontrista',
              acaoParticipacaoEncontro: undefined
            }));

            field.onChange(participacoes);
          };

          // Extrai IDs dos objetos para exibição
          const selectedIds = Array.isArray(field.value) 
            ? field.value.map(p => typeof p === 'object' ? p.idEquipe : p)
            : [];

          return (
            <FormMultiSelect
              field={{
                ...field,
                value: selectedIds,
                onChange: handleValueChange
              }}
              label="Participação em encontros"
              opcoes={encontrosOptions}
              placeholder="Selecione suas participações em encontros"
            />
          );
        }}
      />
    </div>
  )
}