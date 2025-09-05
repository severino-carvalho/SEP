import { Acoes } from "@/components/molecules/tabela/acoes";
import { EquipistaResDto } from "@/types/dtos/services/equipista";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { ColumnDef } from "@tanstack/react-table";

export function montarColunasEquipistas(
  callback: (id: number) => Promise<void>
): ColumnDef<EquipistaResDto>[] {
  return [
    { accessorKey: "nome", header: "Nome" },
    // {
    //   accessorKey: "dataNascimento",
    //   header: "Data de Nascimento",
    //   cell: (info) => {
    //     const dataNascimento = info.getValue() as string;
    //     if (!dataNascimento) return "Não informado";

    //     const [day, month, year] = dataNascimento.split('/');
    //     return `${day}/${month}/${year}`;
    //   }
    // },
    // {
    //   accessorKey: "numeroTelefone",
    //   header: "Telefone",
    //   cell: (info) => {
    //     const telefone = info.getValue() as string;
    //     if (!telefone) return "Não informado";

    //     const cleaned = telefone.replace(/\D/g, '');
    //     if (cleaned.length === 11) {
    //       return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    //     }
    //     return telefone;
    //   }
    // },
    // {
    //   accessorKey: "endereco",
    //   header: "Endereço",
    //   cell: (info) => {
    //     const endereco = info.getValue() as EnderecoDto;
    //     return endereco
    //       ? `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`
    //       : "Não informado";
    //   },
    // },
    // {
    //   accessorKey: "areaAtuacao",
    //   header: "Área de Atuação",
    //   cell: (info) => {
    //     const areaAtuacao = info.getValue() as AreaAtuacaoDto;
    //     return areaAtuacao
    //       ? `${areaAtuacao.formacao} - ${areaAtuacao.ocupacao} - ${areaAtuacao.profissao}`
    //       : "Não informado";
    //   },
    // },
    // {
    //   accessorKey: "estadoCivil",
    //   header: "Estado Civil",
    //   cell: (info) => {
    //     const estadoCivil = info.getValue() as EEstadoCivil;
    //     return estadoCivil || "Não informado";
    //   },
    // },
    // {
    //   accessorKey: "filhos",
    //   header: "Filhos",
    //   cell: (info) => {
    //     const filhos = info.getValue() as number;
    //     return filhos !== undefined && filhos !== null ? filhos.toString() : "Não informado";
    //   }
    // },
    // {
    //   accessorKey: "sacramento",
    //   header: "Sacramento",
    //   cell: (info) => {
    //     const sacramento = info.getValue() as ESacramento;
    //     return sacramento || "Não informado";
    //   },
    // },
    // {
    //   accessorKey: "pastorais",
    //   header: "Pastorais",
    //   cell: (info) => {
    //     const pastorais = info.getValue() as PastoralDto[];
    //     return pastorais && pastorais.length > 0
    //       ? pastorais.map((p) => p.nome).join(", ")
    //       : "Nenhuma";
    //   },
    // },
    // {
    //   accessorKey: "participacoesEncontros",
    //   header: "Participações em Encontros",
    //   cell: (info) => {
    //     const participacoes = info.getValue() as ParticipacaoEncontroDto[];
    //     return participacoes && participacoes.length > 0
    //       ? participacoes.length.toString()
    //       : "Nenhuma";
    //   },
    // },
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
