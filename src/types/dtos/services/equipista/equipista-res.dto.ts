import { EEstadoCivil, ESacramento } from "@/types/enums/app";
import { EntidadeDto } from "../../entidade.dto";

export interface ArquivoResDto {
	fileName: string;
	fileType: string;
	fileData: string;
}

export interface EquipistaResDto extends EntidadeDto, ArquivoResDto {
	nome: string;
	dataNascimento: string;
	enderecoDTO?: EnderecoDto;
	numeroTelefone: string;
	areaAtuacaoDTO?: AreaAtuacaoDto;
	estadoCivil: EEstadoCivil;
	filhos?: number | null;
	pastorais?: PastoralDto[];
	sacramento?: ESacramento;
	participacoesEncontro?: ParticipacaoEncontroDto[];
}

export interface EnderecoDto {
	logradouro: string;
	cep: string;
	numero: string;
	bairro: string;
	cidade: string;
	estado: string;
	complemento?: string;
}

export interface AreaAtuacaoDto {
	formacao: string;
	ocupacao: string;
	profissao: string;
	habilidades?: string;
}

export interface PastoralDto {
	id: number;
	nome: string;
}

export interface ParticipacaoEncontroDto {
	id: number;
	nomeEncontro: string;
	idEquipe: number;
	nomeEquipe: string;
	ano: number | null;
	tipoParticipacao: string;
}
