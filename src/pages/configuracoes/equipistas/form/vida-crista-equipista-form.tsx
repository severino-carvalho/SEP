import { FormSelect, SelectOption } from "@/components/molecules/form/form-select";
import { FormField } from "@/components/ui/form";
import { ErroUtil } from "@/lib/erros/erro-util";
import { pastoralService } from "@/services/equipista-service copy";
import { EquipistaReqDto } from "@/types/dtos/services/equipista";
import { ESacramento } from "@/types/enums/app";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export function ExtrasEquipistaForm() {
  const form = useFormContext<EquipistaReqDto>()

  async function fetchPastorais() {
    try {
      return await pastoralService.findAll()
    } catch (error) {
      ErroUtil.tratar(error)
    }
  }

  const { data: pastorais } = useQuery({
    queryKey: [RotasApiEnum.EQUIPE],
    queryFn: async () => await fetchPastorais(),
  })

  const profissaoOptions = pastorais
    ?.map((pastoral) => ({ label: pastoral.nome, value: pastoral.id } as SelectOption)) ?? [];

  const sacramentosOptions = Object.entries(ESacramento)
    .map(([key, value]) => ({ label: value, value: key } as SelectOption));

  return (
    <div className="flex flex-col gap-5 p-0">
      <FormField
        name="pastorais"
        control={form.control}
        render={({ field }) => (
          <FormSelect
            field={field as never}
            label="Participação em pastorais"
            opcoes={profissaoOptions}
            placeholder="Insira as pastorais em qual você faz parte"
          />
        )}
      />

      <FormField
        name="sacramento"
        control={form.control}
        render={({ field }) => (
          <FormSelect
            field={field as never}
            label="Sacramentos"
            opcoes={sacramentosOptions}
            placeholder="Insira os sacramentos recebidos"
          />
        )}
      />

      <FormField
        name="participacoesEncontros"
        control={form.control}
        render={({ field }) => (
          <FormSelect
            field={field as never}
            label="Participação em encontros"
            opcoes={[]}
            placeholder="Selecione suas participações em encontros"
          />
        )}
      />
    </div>
  )
}