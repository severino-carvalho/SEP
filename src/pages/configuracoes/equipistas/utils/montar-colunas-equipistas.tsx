import { Acoes } from "@/components/molecules/tabela/acoes";
import { AreaAtuacaoDto, EnderecoDto, EquipistaResDto, ParticipacaoEncontroDto, PastoralDto } from "@/types/dtos/services/equipista";
import { EEstadoCivil } from "@/types/enums/app";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { ColumnDef } from "@tanstack/react-table";

export function montarColunasEquipistas(
  callback: (id: number) => Promise<void>
): ColumnDef<EquipistaResDto>[] {
  return [
    { accessorKey: "nome", header: "Nome" },
    { accessorKey: "dataNascimento", header: "Data de Nascimento" },
    { accessorKey: "numeroTelefone", header: "Telefone" },
    {
      accessorKey: "endereco",
      header: "Endereço",
      cell: (info) => {
        const endereco = info.getValue() as EnderecoDto;
        return endereco
          ? `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`
          : "Não informado";
      },
    },
    {
      accessorKey: "areaAtuacao",
      header: "Área de Atuação",
      cell: (info) => info.getValue() ? (info.getValue() as AreaAtuacaoDto).nome : "Não informado",
    },
    {
      accessorKey: "estadoCivil",
      header: "Estado Civil",
      cell: (info) => EEstadoCivil[info.getValue() as keyof typeof EEstadoCivil],
    },
    { accessorKey: "filhos", header: "Filhos" },
    {
      accessorKey: "sacramento",
      header: "Sacramento",
      cell: (info) => (info.getValue() ? info.getValue() : "Não informado"),
    },
    {
      accessorKey: "pastorais",
      header: "Pastorais",
      cell: (info) =>
        info.getValue() && (info.getValue() as PastoralDto[]).length > 0
          ? (info.getValue() as PastoralDto[])
            .map((p: { nome: string }) => p.nome)
            .join(", ")
          : "Nenhuma",
    },
    {
      accessorKey: "participacoesEncontros",
      header: "Participações em Encontros",
      cell: (info) =>
        info.getValue() && (info.getValue() as ParticipacaoEncontroDto[]).length > 0
          ? (info.getValue() as ParticipacaoEncontroDto[]).length.toString()
          : "Nenhuma",
    },
    {
      accessorKey: undefined,
      header: "Ações",
      cell: ({ row }) => {
        const equipistaId = row.original.id!;

        return (
          <Acoes
            id={equipistaId}
            href={RotasAppEnum.CONFIGURACOES_EQUIPISTA_MANUTENCAO}
            callback={async () => callback(equipistaId)}
            mensagem={`Você deseja remover permanentemente o equipista "${row.original.nome}"?`}
          />
        );
      },
    },
  ];
}
