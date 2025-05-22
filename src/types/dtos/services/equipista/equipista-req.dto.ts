import { EEstadoCivil, ESacramento } from "@/types/enums/app";
import { EntidadeDto } from "../../entidade.dto";

interface FileBaseDTO extends Partial<EntidadeDto> {
	fileName: string;
	fileType: string;
	fileData: number[];
}

export interface EquipistaReqDto extends Partial<EntidadeDto>, FileBaseDTO {
	nome: string;
	dataNascimento: string;
	enderecoDTO: EnderecoDTO;
	numeroTelefone: string;
	areaAtuacaoDTO: AreaAtuacaoDTO;
	estadoCivil: EEstadoCivil;
	filhos: string;
	sacramento: ESacramento;
	pastorais: PastoralDTO[];
	participacoesEncontros: ParticipacaoEncontroDTO[];
}

interface EnderecoDTO {
	logradouro: string;
	cep: string;
	numero: string;
	bairro: string;
	cidade: string;
	estado: string;
	complemento: string;
}

interface AreaAtuacaoDTO {
	formacao: string;
	ocupacao: string;
	profissao: string;
	habilidades: string;
}

interface PastoralDTO {
	id: number;
	nome: string;
}

interface ParticipacaoEncontroDTO {
	id: number;
	encontroId: number;
	nomeEncontro: string;
	equipeId: number;
	nomeEquipe: string;
	equipistaId: number;
	anoParticipacao: number;
	tipoParticipacao: string;
}
